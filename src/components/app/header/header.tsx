"use client";

import { Drawer } from "vaul";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import { ModeToggle } from "./mode-toggle";
import ComposeLogo from "./compose-icon.png";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header
      aria-label="Site navigation"
      className="sticky top-0 mx-auto mb-10 w-full flex-none border-b border-border/40 border-gray-200 bg-background/95 bg-white py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-gray-600 dark:bg-gray-800"
    >
      <nav className="container mx-auto flex max-w-2xl items-center justify-between gap-2">
        <Link className="relative flex items-center gap-2" href="/">
          <Image
            src={ComposeLogo}
            alt="Simple Press Logo"
            className="object-contain"
            height={50}
            priority
          />
          <h1>Simple Press</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Menu className="hidden md:block" />
          <ModeToggle />

          <Drawer.Root direction="right">
            <Drawer.Trigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <MenuIcon className="h-4 w-4 justify-end" />
              </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="fixed bottom-0 right-0 mt-24 flex h-full w-40 flex-col bg-white py-10 dark:border-gray-600 dark:bg-gray-800">
                <div className="flex flex-col items-center justify-center">
                  <Menu mobile />
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </nav>
    </header>
  );
};
