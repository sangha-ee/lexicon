import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Header } from "@/components/app/header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Press",
  description: "Pressing simplicity into every word.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <Header />
            <main className="container max-w-2xl">{children}</main>
          </>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
