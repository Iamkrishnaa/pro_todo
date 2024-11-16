import {
  AnimationEffectType,
  AnimationType,
} from "@/types/common/animationTypes";

// Helper function to get the CSS class for animations
export const getAnimationClass = (
  animation: AnimationType,
  isOpen: boolean
): string => {
  switch (animation) {
    case "slide-up":
      return isOpen
        ? "translate-y-0 opacity-100"
        : "translate-y-full opacity-0";
    case "slide-down":
      return isOpen
        ? "translate-y-0 opacity-100"
        : "-translate-y-full opacity-0";
    case "slide-left":
      return isOpen
        ? "translate-x-0 opacity-100"
        : "-translate-x-full opacity-0";
    case "slide-right":
      return isOpen
        ? "translate-x-0 opacity-100"
        : "translate-x-full opacity-0";
    case "scale-up":
      return isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0";
    case "scale-down":
      return isOpen ? "scale-100" : "scale-150";
    default:
      return isOpen ? "translate-y-0" : "-translate-y-full";
  }
};

// Helper function to get the CSS class for animation effects
export const getAnimationEffectClass = (
  effect: AnimationEffectType,
  isActive: boolean
): string => {
  switch (effect) {
    case "shake":
      return isActive ? "animate-shake" : "";
    case "bounce":
      return isActive ? "animate-bounce" : "";
    case "pulse":
      return isActive ? "animate-pulse" : "";
    case "heartbeat":
      return isActive ? "animate-heartbeat" : "";
    case "rubberBand":
      return isActive ? "animate-rubberBand" : "";
    case "wobble":
      return isActive ? "animate-wobble" : "";
    case "jello":
      return isActive ? "animate-jello" : "";
    case "flash":
      return isActive ? "animate-flash" : "";
    case "bounceIn":
      return isActive ? "animate-bounceIn" : "";
    case "bounceOut":
      return isActive ? "animate-bounceOut" : "";
    default:
      return "";
  }
};
