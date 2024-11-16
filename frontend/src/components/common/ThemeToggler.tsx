"use client";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/dropdown";
import { DropdownPosition } from "@/components/dropdown/Dropdown";
import ThemeMode from "@/enums/ThemeMode";
import { useTheme } from "next-themes";
import { useState } from "react";
import { FaSun, FaMoon, FaAdjust, FaCheckCircle } from "react-icons/fa";

export default function ThemeToggler({
  position = "bottom",
}: {
  position?: DropdownPosition;
}) {
  const { theme, setTheme } = useTheme();
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);

  const changeTheme = (themeMode: ThemeMode) => {
    setTheme(themeMode);
    setIsThemePickerOpen(false);
  };

  const getCurrentTheme = (): ThemeMode => {
    switch (theme) {
      case "light":
        return ThemeMode.LIGHT;
      case "dark":
        return ThemeMode.DARK;
      case "system":
        return ThemeMode.SYSTEM;
      default:
        return ThemeMode.SYSTEM;
    }
  };

  const getThemeIconFromTheme = (themeMode: ThemeMode) => {
    switch (themeMode) {
      case ThemeMode.LIGHT:
        return <FaSun size={16} />;
      case ThemeMode.DARK:
        return <FaMoon size={16} />;
      case ThemeMode.SYSTEM:
        return <FaAdjust size={16} />;
      default:
        return <FaAdjust size={16} />;
    }
  };

  const getCurrentThemeIcon = () => {
    return getThemeIconFromTheme(getCurrentTheme());
  };

  const handleThemePickerClick = () => {
    setIsThemePickerOpen((prevState) => !prevState);
  };

  return (
    <Dropdown
      isOpen={isThemePickerOpen}
      onToggle={handleThemePickerClick}
      onClose={handleThemePickerClick}
      closeOnScroll={true}
      position={position}
    >
      <DropdownTrigger>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-400/20 p-2 font-extrabold shadow-lg">
          {getCurrentThemeIcon()}
        </div>
      </DropdownTrigger>
      <DropdownContent>
        <div className="simple-border-color mt-5 inline-block max-h-[200px] w-40 rounded-2xl border bg-lightSecondary px-1 shadow-lg dark:bg-darkSecondary">
          {Object.values(ThemeMode).map((themeMode) => (
            <button
              key={themeMode}
              onClick={() => changeTheme(themeMode)}
              className={`link-hover my-1 w-full rounded-xl px-4 py-2 text-left focus:outline-none ${
                getCurrentTheme() === themeMode
                  ? "bg-gray-200 dark:bg-slate-700"
                  : ""
              } `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3 capitalize">
                  <div>{getThemeIconFromTheme(themeMode)}</div>
                  <div className="">{themeMode}</div>
                </div>
                {getCurrentTheme() === themeMode && (
                  <FaCheckCircle
                    className="text-dark dark:text-light"
                    size={14}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
