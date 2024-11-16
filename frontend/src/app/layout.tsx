import type { Metadata } from "next";
import "@/styles/globals.scss";
import { CustomThemeProvider } from "@/providers";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Pro Todo",
  description: "A simple todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning={true}
      className="hide-scrollbar scroll-smooth"
    >
      <body
        className="bg-light transition-all duration-500 dark:bg-dark"
        suppressHydrationWarning
      >
        <CustomThemeProvider>
          <NextTopLoader showSpinner={false} color="#4A6CF7" />
          <Toaster position="bottom-center" />
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
