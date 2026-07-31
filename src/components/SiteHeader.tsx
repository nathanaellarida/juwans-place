"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { BookingLink } from "@/components/BookingLink";
import { MenuOverlay } from "@/components/MenuOverlay";
import { Wordmark } from "@/components/Wordmark";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[500] flex items-start justify-between p-[clamp(0.7rem,1.5vw,1.5rem)]">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="button-roll pointer-events-auto flex min-h-11 items-center gap-2 overflow-hidden rounded-[0.6rem] bg-black px-5 py-3 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5a82e] max-md:size-12 max-md:justify-center max-md:px-0"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <Menu className="hidden max-md:block" aria-hidden="true" size={22} />
          <span className="max-md:hidden">Menu</span>
          <span className="max-md:hidden" aria-hidden="true">
            Menu
          </span>
        </button>

        <Link
          href="/"
          aria-label="Juwan’s Place home"
          className="pointer-events-auto absolute left-1/2 top-[clamp(0.8rem,1.5vw,1.5rem)] -translate-x-1/2 text-white mix-blend-difference focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          <Wordmark compact inverted />
        </Link>

        <BookingLink
          className="button-roll pointer-events-auto max-w-[11rem] overflow-hidden bg-black text-white max-md:max-w-[8.5rem] max-md:px-3 max-md:text-[0.66rem]"
          label="Book on Airbnb"
          missingLabel="Airbnb soon"
        />
      </header>

      {menuOpen ? <MenuOverlay onClosed={() => setMenuOpen(false)} /> : null}
    </>
  );
}
