"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { imagesInCategory } from "@/lib/images";
import { cn } from "@/lib/styles";

/** Every file in public/images/stickers joins the trail, so adding a landmark
 *  is a drop-in with no code change. */
const stickers = imagesInCategory("stickers");

/** Nodes per artwork. A quick sweep keeps a dozen stickers in flight at once,
 *  and reusing one that has not faded out yet makes it jump across the hero. */
const POOL_PER_STICKER = 4;

/** Cursor travel between drops, in pixels — roughly one sticker wide, so they
 *  land as a readable trail rather than a pile. */
const SPAWN_DISTANCE = 132;

/** A trail follows a cursor, so there is nothing to follow on touch, and it is
 *  exactly the kind of decorative motion a reduced-motion request switches off. */
const TRAIL_CAPABLE = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

const subscribeToCapability = (onChange: () => void) => {
  const query = window.matchMedia(TRAIL_CAPABLE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

type StickerTrailProps = {
  className?: string;
};

export function StickerTrail({ className }: StickerTrailProps) {
  const container = useRef<HTMLDivElement>(null);
  const capable = useSyncExternalStore(
    subscribeToCapability,
    () => window.matchMedia(TRAIL_CAPABLE).matches,
    // The server cannot know the pointer type, so nothing renders until the
    // client has hydrated and can answer.
    () => false,
  );

  useEffect(() => {
    const root = container.current;
    if (!capable || !root) return;

    const nodes = Array.from(root.children) as HTMLElement[];
    if (nodes.length === 0) return;

    // The box is square and object-contain fits each artwork inside it, so one
    // measurement centres every sticker whatever its aspect ratio.
    let size = nodes[0].offsetWidth;
    const measure = () => {
      size = nodes[0].offsetWidth;
    };

    let next = 0;
    let layer = 0;
    let anchorX = 0;
    let anchorY = 0;
    let tracking = false;

    const drop = (x: number, y: number) => {
      const node = nodes[next % nodes.length];
      next += 1;
      layer += 1;

      gsap.killTweensOf(node);
      gsap.set(node, {
        x: x - size / 2,
        y: y - size / 2,
        rotation: gsap.utils.random(-16, 16),
        scale: 0.4,
        autoAlpha: 0,
        // Newest sticker on top, so the trail reads in the order it was drawn.
        zIndex: layer,
      });

      gsap
        .timeline()
        .to(node, {
          scale: gsap.utils.random(0.92, 1.08),
          autoAlpha: 1,
          duration: 0.42,
          ease: "back.out(2.4)",
        })
        .to(
          node,
          {
            y: `-=${gsap.utils.random(18, 34)}`,
            rotation: `+=${gsap.utils.random(-12, 12)}`,
            scale: 0.72,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power2.in",
          },
          "+=0.5",
        );
    };

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        tracking = false;
        return;
      }

      // Seed the anchor on entry rather than dropping straight away, so a
      // sticker never appears under a cursor that simply happens to be resting
      // over the hero when the page loads.
      if (!tracking) {
        tracking = true;
        anchorX = x;
        anchorY = y;
        return;
      }

      if (Math.hypot(x - anchorX, y - anchorY) < SPAWN_DISTANCE) return;
      anchorX = x;
      anchorY = y;
      drop(x, y);
    };

    // The cursor can only be over the hero while the hero is on screen, so the
    // window listener has nothing to do once it scrolls away — every move
    // would just measure the container to conclude the pointer is outside it.
    // Attach it only while the hero intersects the viewport.
    let attached = false;
    const attach = () => {
      if (attached) return;
      attached = true;
      window.addEventListener("pointermove", onMove, { passive: true });
    };
    const detach = () => {
      if (!attached) return;
      attached = false;
      window.removeEventListener("pointermove", onMove);
      // Re-seed on the next entry, exactly as leaving the panel does.
      tracking = false;
    };
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) attach();
      else detach();
    });
    visibility.observe(root);
    window.addEventListener("resize", measure);

    return () => {
      visibility.disconnect();
      detach();
      window.removeEventListener("resize", measure);
      gsap.killTweensOf(nodes);
      gsap.set(nodes, { clearProps: "all" });
    };
  }, [capable]);

  if (!capable || stickers.length === 0) return null;

  return (
    <div ref={container} className={cn("sticker-trail", className)} aria-hidden="true">
      {Array.from({ length: stickers.length * POOL_PER_STICKER }, (_, index) => (
        // Purely decorative, and next/image would lazy-load them — the trail
        // needs every sticker decoded before the cursor first calls for it.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={index}
          src={stickers[index % stickers.length].src}
          alt=""
          className="sticker-trail-item"
          draggable={false}
          decoding="async"
        />
      ))}
    </div>
  );
}
