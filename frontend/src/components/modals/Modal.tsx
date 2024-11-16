import {
  AnimationEffectType,
  AnimationType,
} from "@/types/common/animationTypes";
import {
  getAnimationClass,
  getAnimationEffectClass,
} from "@/utils/animationUtils";
import { uniqueId } from "lodash";
import React, { useState } from "react";

export default function Modal({
  open,
  onClose,
  children,
  isDismissable = true,
  enableBackdropBlur = true,
  backdropBlurIntensity,
  duration = 300,
  rounded = "xl",
  backdropClasses = "",
  modalClasses = "",
  bgColor = "bg-lightSecondary",
  darkBgColor = "dark:bg-darkSecondary",
  modalPadding = "p-6",
  overlayColor = "bg-black/30",
  enableDismissRestrictAnimation = false,
  dismissRestrictAnimation = "shake",
  enableModalAnimation = true,
  modalAnimation = "scale-up",
  additionalModalClasses = "",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isDismissable?: boolean;
  enableBackdropBlur?: boolean;
  backdropBlurIntensity?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  duration?: 0 | 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  backdropClasses?: string;
  modalClasses?: string;
  bgColor?: string;
  darkBgColor?: string;
  modalPadding?: string;
  overlayColor?: string;
  enableDismissRestrictAnimation?: boolean;
  dismissRestrictAnimation?: AnimationEffectType;
  modalAnimation?: AnimationType;
  enableModalAnimation?: boolean;
  additionalModalClasses?: string;
}) {
  const [restrictAnimation, setRestrictAnimation] = useState(false);

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (isDismissable) {
      onClose();
    } else {
      setRestrictAnimation(true);
      setTimeout(() => {
        setRestrictAnimation(false);
      }, 500);
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      id={uniqueId("modal-")}
      className={`fixed inset-0 left-0 top-0 flex h-screen w-screen cursor-default items-center justify-center transition-all ${
        open ? "visible" : "invisible"
      } z-[999] p-4 ${
        enableBackdropBlur ? `backdrop-blur-${backdropBlurIntensity}` : ""
      } ${overlayColor} ${backdropClasses}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-${rounded} ${bgColor} dark:${darkBgColor} ${modalPadding} shadow transition-all ${
          enableModalAnimation
            ? `${getAnimationClass(modalAnimation, open)} opacity-${open ? "100" : "0"}`
            : ""
        } ${
          enableModalAnimation ? `duration-${duration}` : "duration-0"
        } max-w-full ${modalClasses} ${enableDismissRestrictAnimation && getAnimationEffectClass(dismissRestrictAnimation, restrictAnimation)} ${additionalModalClasses} `}
      >
        {children}
      </div>
    </div>
  );
}
