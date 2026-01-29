import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SEND_TIMEOUT_MS = 25000; // 25s max wait for sending (SMTP can be slow on some networks)

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error("Missing Gmail credentials: set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local");
      return NextResponse.json(
        {
          error: "Contact form is not configured. Please email us directly or try again later.",
          code: "CONFIG_MISSING",
        },
        { status: 503 }
      );
    }

    // Remove spaces from app password if present (Gmail app passwords sometimes have spaces)
    const cleanPassword = gmailAppPassword.replace(/\s/g, "");

    // Create transporter with generous timeouts (Gmail SMTP can be slow or blocked on some networks)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: cleanPassword,
      },
      connectionTimeout: 20000, // 20s to establish connection
      greetingTimeout: 10000,   // 10s for server greeting
    });

    // Email content
    const mailOptions = {
      from: gmailUser,
      to: gmailUser, // Send to yourself, or change to your business email
      replyTo: email,
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
          </div>
          
          <div style="margin-top: 30px;">
            <h3 style="color: #333;">Message:</h3>
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; line-height: 1.6;">
              ${message.replace(/\n/g, "<br>")}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from the NexGen Developers contact form.</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        
        Message:
        ${message}
      `,
    };

    // Send email with timeout so we don't hang
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Email send timed out")), SEND_TIMEOUT_MS)
    );
    await Promise.race([sendPromise, timeoutPromise]);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const isConnectionTimeout = /connection timeout|connection timed out|ETIMEDOUT|ECONNREFUSED/i.test(errorMessage);
    const isSendTimeout = errorMessage.includes("timed out") && !isConnectionTimeout;
    const isAuth = /invalid login|authentication failed|username and password/i.test(errorMessage);

    let userMessage = "Failed to send email. Please try again later.";
    if (isConnectionTimeout) {
      userMessage = "Connection to email server timed out. Try again, or check if your network allows outbound email (ports 465/587).";
    } else if (isSendTimeout) {
      userMessage = "Request took too long. Please try again.";
    } else if (isAuth && process.env.NODE_ENV === "development") {
      userMessage = "Gmail auth failed. Check GMAIL_USER and GMAIL_APP_PASSWORD in .env.local.";
    }

    return NextResponse.json(
      {
        error: userMessage,
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
