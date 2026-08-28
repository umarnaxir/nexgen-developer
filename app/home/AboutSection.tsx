"use client";

import React from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import MotionImage from "@/components/motion/MotionImage";

export default function AboutSection() {
  return (
    <section className="section-light section-y relative">
      <div className="section-container">
        <div
          className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20"
          data-aos="fade-up"
        >
          <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-gold/30 lg:max-w-none">
            <MotionImage
              src="/images/projects/code2concept.png"
              alt="NexGen Developers team at work"
              fill
              className="grayscale hover:grayscale-0"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="max-w-xl">
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-primary">
              A studio obsessed with <span className="text-gold-dark">craft.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-gray sm:text-lg">
              We partner with ambitious teams to design and ship digital products that feel
              intentional, refined, and built to last.
            </p>
            <div className="mt-10">
              <MagneticButton href="/about">Learn more</MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
