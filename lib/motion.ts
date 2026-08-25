export const EASE = [0.22, 1, 0.36, 1] as const;

export type AosAnimation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-in-up"
  | "img-reveal";

/** HTML attrs for AOS — safe on server components. */
export function aos(animation: AosAnimation = "fade-up", delay = 0) {
  return {
    "data-aos": animation,
    "data-aos-delay": Math.min(Math.max(Math.round(delay), 0), 400),
  } as const;
}

export const hoverLift = {
  y: -6,
  transition: { type: "spring" as const, stiffness: 400, damping: 28 },
};
