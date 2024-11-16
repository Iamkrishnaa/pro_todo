"use client";

import { ThemeProvider } from "next-themes";

type CustomThemeProvider = JSX.Element;
/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
