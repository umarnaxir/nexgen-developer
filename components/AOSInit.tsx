"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOS_DURATION = 600;

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: AOS_DURATION,
      once: true,
      offset: 60,
      easing: "ease-out-cubic",
    });
  }, []);
  return null;
}
