declare module "aos" {
  export interface AosOptions {
    duration?: number;
    once?: boolean;
    offset?: number;
    delay?: number;
    easing?: string;
    mirror?: boolean;
    anchorPlacement?: string;
    disable?: boolean | (() => boolean);
  }

  const AOS: {
    init: (options?: AosOptions) => void;
    refresh: () => void;
    refreshHard: () => void;
  };

  export default AOS;
}

declare module "aos/dist/aos.css";
