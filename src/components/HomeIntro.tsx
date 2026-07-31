import Link from "next/link";
import { ImagePanel } from "@/components/ImagePanel";
import { Reveal } from "@/components/Reveal";
import { property } from "@/data/property";

export function HomeIntro() {
  return (
    <section
      id="home-intro"
      className="relative overflow-hidden bg-[#f7f3ea] px-[clamp(1.25rem,4vw,4rem)] pb-[clamp(5rem,10vw,10rem)] pt-[clamp(7rem,12vw,12rem)]"
    >
      <span
        className="curve-line -left-[24vw] top-[22rem] h-[42rem] w-[56rem] rotate-[18deg] text-[#d5a82e]"
        aria-hidden="true"
      />
      <span
        className="curve-line -right-[30vw] -top-[20rem] h-[45rem] w-[58rem] rotate-[-10deg] text-[#145c5b]"
        aria-hidden="true"
      />

      <Reveal className="relative z-10 mx-auto grid max-w-[92rem] gap-14 md:grid-cols-[1.15fr_0.65fr] md:gap-20">
        <div data-reveal-item>
          <p className="eyebrow mb-7 text-[#e45d3a]">The bedrooms</p>
          <h2 className="font-display text-[clamp(4.8rem,8vw,8.5rem)] leading-[0.78] tracking-[-0.055em]">
            One Home.
            <br />
            Three Colorful
            <br />
            Ways to Rest.
          </h2>
        </div>

        <div className="flex flex-col items-start md:pt-5" data-reveal-item>
          <RotatingBadge />
          <p className="body-large mt-3 max-w-md">
            Whether you’re visiting with family, exploring Cebu, or staying for
            work, find your rhythm in a private home designed for comfort and
            convenience.
          </p>
          <Link
            href="/the-home"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-[0.55rem] bg-black px-6 py-3 text-sm font-bold uppercase text-white transition-transform hover:rotate-2"
          >
            View the home
          </Link>
        </div>
      </Reveal>

      <Reveal
        className="relative z-10 mx-auto mt-[clamp(5rem,9vw,9rem)] grid max-w-[92rem] gap-4 md:grid-cols-3"
        stagger={0.12}
      >
        {property.rooms.map((room) => (
          <article
            key={room.name}
            data-reveal-item
            className="group h-[min(78vh,52rem)] min-h-[36rem] overflow-hidden rounded-[1rem] bg-black md:h-[min(82vh,54rem)]"
          >
            <ImagePanel
              category={room.category}
              preferredFileName={room.preferredImage}
              alt={`${room.name} at Juwan’s Place`}
              label={`Add ${room.name.toLowerCase()} photography`}
              className="h-[68%]"
              imageClassName="transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 767px) 100vw, 33vw"
            />
            <div
              className="flex h-[32%] flex-col items-center justify-center px-7 py-6 text-center text-white"
              style={{ backgroundColor: room.color }}
            >
              <h3 className="font-display text-[clamp(3rem,4.2vw,4.7rem)] uppercase leading-none tracking-[-0.045em]">
                {room.name}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85 md:text-base">
                {room.description}
              </p>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

function RotatingBadge() {
  return (
    <div
      className="rotating-badge relative mb-5 flex size-44 items-center justify-center rounded-full text-[#145c5b]"
      aria-label="Feel at home. Stay in Lapu-Lapu."
    >
      <svg className="absolute inset-0 size-full" viewBox="0 0 180 180">
        <defs>
          <path
            id="badge-path"
            d="M90,90 m-67,0 a67,67 0 1,1 134,0 a67,67 0 1,1 -134,0"
          />
        </defs>
        <text className="fill-current text-[13px] font-bold uppercase tracking-[0.13em]">
          <textPath href="#badge-path">
            Feel at home · Stay in Lapu-Lapu ·
          </textPath>
        </text>
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 72 72"
        className="size-16"
        fill="none"
      >
        <path
          d="M9 34.5L36 12L63 34.5V61H9V34.5Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M28 61V42H44V61" stroke="currentColor" strokeWidth="3" />
        <path
          d="M18 26C24 31 30 31 36 26C42 31 48 31 54 26"
          stroke="#E45D3A"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
