"use client";

import { FloatingControls } from "@/components/FloatingControls";
import { Preloader } from "@/components/Preloader";
import { RouteTransition } from "@/components/RouteTransition";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";

export function SiteShell() {
  return (
    <>
      <Preloader />
      <RouteTransition />
      <SmoothScroll />
      <SiteHeader />
      <FloatingControls />
    </>
  );
}
