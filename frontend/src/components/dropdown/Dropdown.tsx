import React, { useEffect, ReactElement } from "react";
import DropdownTrigger from "./DropDownTrigger";
import DropdownContent from "./DropDownContent";
import { AnimationType } from "@/types/common/animationTypes";
import { getAnimationClass } from "@/utils/animationUtils";

export type DropdownPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "center"
  | "center-top"
  | "center-bottom"
  | "center-left"
  | "center-right"
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

// Dropdown component props interface
interface DropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  position?: DropdownPosition;
  children: ReactElement[];
  animation?: AnimationType;
  enableAnimation?: boolean;
  animationDuration?: 0 | 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;
  closeOnScroll?: boolean;
}

/**
 * Dropdown component
 * @param isOpen - boolean to check if dropdown is open
 * @param onToggle - function to toggle dropdown
 * @param onClose - function to close dropdown
 * @param position - position of dropdown content
 * @param children - dropdown trigger and content components
 * @param animation - animation type for dropdown content
 * @param enableAnimation - boolean to enable animation
 * @param animationDuration - duration of animation
 * @returns Dropdown component
 * @example
 * ```tsx
 * <Dropdown isOpen={isOpen} onToggle={toggleDropdown} onClose={closeDropdown} position="bottom">
 *  <DropdownTrigger>
 *    <div>Click Here</div>
 * </DropdownTrigger>
 * <DropdownContent>
 *   <div>Dropdown Content</div>
 * </DropdownContent>
 * </Dropdown>
 * ```
 */
const Dropdown = ({
  isOpen,
  onToggle,
  onClose,
  position = "bottom",
  children,
  enableAnimation = true,
  animation = "scale-up",
  animationDuration = 300,
  closeOnScroll = true,
}: DropdownProps) => {
  const id = `dropdown-${Math.random().toString(36).substring(2, 15)}`;

  useEffect(() => {
    const contentArea = document.getElementById("content");

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof Node &&
        !(event.target as Element).closest("#" + id)
      ) {
        onClose();
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        onClose();
      }
    };

    contentArea?.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);

    if (closeOnScroll && isOpen) {
      contentArea?.addEventListener("scroll", handleScroll);
      document.addEventListener("scroll", handleScroll);
    }

    return () => {
      contentArea?.removeEventListener("mousedown", handleClickOutside);
      contentArea?.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, onClose, id, closeOnScroll]);

  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return "bottom-full";
      case "bottom":
        return "top-full";
      case "left":
        return "right-full";
      case "right":
        return "left-full";
      case "center":
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      case "center-top":
        return "bottom-full left-1/2 transform -translate-x-1/2";
      case "center-bottom":
        return "top-full left-1/2 transform -translate-x-1/2";
      case "center-left":
        return "right-full top-1/2 transform -translate-y-1/2";
      case "center-right":
        return "left-full top-1/2 transform -translate-y-1/2";
      case "bottom-left":
        return "top-full right-0";
      case "bottom-right":
        return "top-full left-0";
      case "top-left":
        return "bottom-full right-0";
      case "top-right":
        return "bottom-full left-0";
      default:
        return "top-full mt-2";
    }
  };

  // Identify the Trigger and Content components based on tag name
  const triggerElement = children.find(
    (child) => child.type === DropdownTrigger
  );
  const contentElement = children.find(
    (child) => child.type === DropdownContent
  );

  // Validate that both Trigger and Content are provided
  if (!triggerElement) {
    throw new Error("Dropdown must contain a DropdownTrigger component.");
  }
  if (!contentElement) {
    throw new Error("Dropdown must contain a DropdownContent component.");
  }

  return (
    <div id={id} className="dropdown relative inline-block">
      {/* Render the Trigger */}
      {triggerElement &&
        React.cloneElement(triggerElement, { onClick: onToggle })}

      {/* Render the Content if dropdown is open */}
      {contentElement && (
        <div
          className={`absolute z-10 transform transition-all ${
            enableAnimation ? `duration-${animationDuration}` : "duration-0"
          } ease-in-out ${
            enableAnimation
              ? `${getAnimationClass(animation, isOpen)} opacity-${isOpen ? "100" : "0"}`
              : ""
          } ${getPositionStyles()}`}
        >
          {contentElement}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
