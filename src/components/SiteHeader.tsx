"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarCheck, Menu as MenuIcon } from "lucide-react";
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
          // Below md the two word buttons and the wordmark left 31px between
          // them on a 360px screen, which read as crowded even though nothing
          // actually touched. Each becomes its own icon there and the lockup
          // gets the middle of the bar to itself.
          className="button-roll pointer-events-auto flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-[0.6rem] bg-black px-5 py-3 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5a82e] max-md:size-12 max-md:min-h-12 max-md:gap-0 max-md:px-0"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span className="max-md:hidden">Menu</span>
          <span aria-hidden="true" className="max-md:hidden">
            Menu
          </span>
          <MenuIcon aria-hidden="true" size={22} className="md:hidden" />
        </button>

        <Link
          href="/"
          aria-label="Juwan’s Place home"
          className="pointer-events-auto absolute left-1/2 top-[clamp(0.8rem,1.5vw,1.5rem)] -translate-x-1/2 text-white mix-blend-difference focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          {/* mono: the link difference-blends against whatever section is
              underneath, which needs a single flat colour to invert cleanly. */}
          <Wordmark compact inverted mono />
        </Link>

        <BookingLink
          className="button-roll pointer-events-auto max-w-[11rem] overflow-hidden bg-black text-white max-md:size-12 max-md:max-w-none max-md:px-0"
          label="Book on Airbnb"
          missingLabel="Airbnb soon"
          compactIcon={<CalendarCheck aria-hidden="true" size={22} />}
        />
      </header>

      {menuOpen ? <MenuOverlay onClosed={() => setMenuOpen(false)} /> : null}
    </>
  );
}
