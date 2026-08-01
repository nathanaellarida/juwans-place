import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { InteractiveLetters } from "@/components/InteractiveLetters";
import { Reveal } from "@/components/Reveal";
import { Wordmark } from "@/components/Wordmark";
import { siteConfig } from "@/config/site";

const stayCards = [
  {
    eyebrow: "Private home",
    title: "Family Stays",
    color: "#fcba57",
  },
  {
    eyebrow: "Mactan base",
    title: "Cebu Adventures",
    color: "#d5a82e",
  },
  {
    eyebrow: "Practical comfort",
    title: "Work & Long Stays",
    color: "#145c5b",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black px-[clamp(1.25rem,4vw,4rem)] pb-8 pt-[clamp(4rem,7vw,7rem)] text-white">
      <Reveal className="mx-auto grid max-w-[88rem] gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
        <div data-reveal-item>
          <Wordmark className="items-start" inverted />
          <p className="mt-7 max-w-md text-balance text-lg text-white/70">
            A welcoming entire home in Lapu-Lapu City for families, friends,
            tourists, and working travelers.
          </p>
          <p className="mt-5 text-sm text-white/55">
            Hosted by Estrella Duran · Superhost
          </p>
        </div>

        <div
          className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
          data-reveal-item
        >
          <FooterColumn title="Main" links={siteConfig.footerNavigation} />
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.12em]">
              Quick links
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <BookingLink
                  className="min-h-0 justify-start p-0 text-left text-sm font-normal normal-case tracking-normal text-white/75 hover:text-white"
                  label="Book on Airbnb"
                  missingLabel="Airbnb link coming soon"
                  showIcon
                />
              </li>
              {siteConfig.quickLinks.slice(1, -1).map((link) => (
                <li key={link.href + link.label}>
                  <Link className="transition-colors hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                {siteConfig.contactUrl ? (
                  <a
                    className="transition-colors hover:text-white"
                    href={siteConfig.contactUrl}
                  >
                    Call {siteConfig.contactDisplay}
                  </a>
                ) : (
                  <span className="text-white/40">Contact coming soon</span>
                )}
              </li>
            </ul>
          </div>
          <FooterColumn title="Guest info" links={siteConfig.legalNavigation} />
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-[clamp(5rem,8vw,9rem)] max-w-[96rem]">
        <div data-reveal-item>
          <InteractiveLetters
            text="Come.Stay.Here."
            className="whitespace-nowrap text-center font-display text-[10.5vw] uppercase leading-[0.72] tracking-[-0.06em] text-[#d8d0c7] md:text-[12.1vw]"
          />
        </div>
        <div
          data-reveal-item
          className="mx-auto mt-[clamp(3rem,5vw,5rem)] grid max-w-4xl gap-4 md:grid-cols-3"
        >
          {stayCards.map((card) => (
            <div
              key={card.title}
              className="footer-card group relative min-h-36 rounded-[1.1rem] border border-white/70 p-6 text-center"
            >
              <span
                className="mx-auto mb-4 block size-2.5 rounded-full transition-transform group-hover:scale-[2]"
                style={{ backgroundColor: card.color }}
                aria-hidden="true"
              />
              <span className="block text-xs uppercase tracking-[0.17em] text-white/55">
                {card.eyebrow}
              </span>
              <span className="mt-2 block font-display text-2xl uppercase">
                {card.title}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-14 flex max-w-[88rem] flex-col items-center justify-between gap-4 border-t border-white/30 pt-6 text-center text-xs text-white/55 sm:flex-row sm:text-left">
        <p>© 2026 Juwan’s Place. All rights reserved.</p>
        <p>Reservations and payments are completed through Airbnb only.</p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.12em]">
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm text-white/75">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link className="transition-colors hover:text-white" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
