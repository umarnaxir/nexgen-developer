import { NextRequest, NextResponse } from 'next/server';
import { classifyMessage } from '@/lib/guard';
import { createChatStream } from '@/lib/openai';
import { checkRateLimit, validateChatRequest } from '@/lib/chat';
import { sanitizeInput } from '@/lib/utils';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // ── Rate Limiting ─────────────────────────────────────
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    // ── Parse & Validate Request ──────────────────────────
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body.' },
        { status: 400 }
      );
    }

    const validation = validateChatRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { messages } = body as {
      messages: { role: 'user' | 'assistant'; content: string }[];
    };

    // ── Sanitize Latest User Message ──────────────────────
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from the user.' },
        { status: 400 }
      );
    }

    const sanitizedContent = sanitizeInput(lastMessage.content);
    if (sanitizedContent.length === 0) {
      return NextResponse.json(
        { error: 'Message content cannot be empty after sanitization.' },
        { status: 400 }
      );
    }

    // Update the last message with sanitized content
    const sanitizedMessages = [
      ...messages.slice(0, -1),
      { ...lastMessage, content: sanitizedContent },
    ];

    // ── Guardrail Check ───────────────────────────────────
    const guardResult = classifyMessage(sanitizedContent);

    if (!guardResult.allowed) {
      // Return rejection as a non-streaming JSON response
      // No OpenAI API call is made
      return NextResponse.json({
        rejected: true,
        message: guardResult.reason,
      });
    }

    // ── Call OpenAI with Streaming ─────────────────────────
    const stream = await createChatStream(sanitizedMessages);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: unknown) {
    console.error('[Chat API Error]', error);

    // Detect OpenAI/OpenRouter auth or model errors
    const statusCode = (error as { status?: number })?.status;
    if (statusCode === 401) {
      return NextResponse.json(
        { error: 'AI service authentication error. Please contact support.' },
        { status: 500 }
      );
    }
    if (statusCode === 404) {
      return NextResponse.json(
        { error: 'AI model not found. Please contact support.' },
        { status: 500 }
      );
    }
    if (statusCode === 429) {
      return NextResponse.json(
        { error: 'AI service is busy. Please try again in a moment.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Sorry, I'm currently unavailable. Please try again later." },
      { status: 500 }
    );
  }
}
