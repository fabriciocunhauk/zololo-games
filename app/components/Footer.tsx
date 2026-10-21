import Image from "next/image";
import Link from "next/link";
import { DIFFICULTIES } from "@/app/constants/difficulty";
import { GAMES } from "@/app/constants/games";
import lockup from "@/public/images/brand/zololo-games-lockup.png";
import Container from "./Container";
import MonsterArt from "./monsters/MonsterArt";
import { MONSTERS } from "./monsters/monsters";

// A few monsters peek over the top edge of the footer.
const PEEKERS = [MONSTERS[0], MONSTERS[4], MONSTERS[9], MONSTERS[14]];

const linkClasses =
  "rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t-[3px] border-ink bg-pink-primary">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 flex -translate-y-[62%] justify-around px-6 sm:justify-evenly"
      >
        {PEEKERS.map((monster, idx) => (
          <MonsterArt
            key={monster.name}
            monster={monster}
            className={idx % 2 === 0 ? "w-14 sm:w-16" : "w-12 sm:w-14"}
          />
        ))}
      </div>

      <Container
        size="lg"
        classes={{
          container:
            "grid gap-10 px-4 pt-12 pb-8 sm:px-10 md:grid-cols-[1fr_2fr_1.2fr]",
        }}
      >
        <section className="flex flex-col items-start gap-3">
          <Link href="/" aria-label="Zololo Games home" className={linkClasses}>
            <Image src={lockup} alt="" className="h-20 w-auto" />
          </Link>
          <p className="max-w-xs font-bold">
            Little games for curious minds. Free to play, nothing to sign up
            for.
          </p>
        </section>

        <nav aria-labelledby="footer-games">
          <h2 id="footer-games" className="font-display text-xl">
            Games
          </h2>
          <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1 min-[420px]:grid-cols-2">
            {GAMES.map(({ name, href, skill, Art }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${linkClasses} group flex min-h-11 items-center gap-3 py-1`}
                >
                  <Art className="h-9 w-auto shrink-0 motion-safe:transition-transform motion-safe:group-hover:-rotate-6" />
                  <span className="flex flex-col leading-tight">
                    <span className="font-bold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-2">
                      {name}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink/70">
                      {skill}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="footer-grown-ups">
          <h2 id="footer-grown-ups" className="font-display text-xl">
            For grown-ups
          </h2>
          <p className="mt-3">
            Every game has three levels. Pick the one that fits, then play
            along and talk about what you see.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {DIFFICULTIES.map((option) => (
              <li
                key={option.id}
                style={{ background: option.tile }}
                className="rounded-full border-[3px] border-ink px-3 py-0.5 text-sm font-bold"
              >
                {option.label} · {option.ages}
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <div className="border-t-[3px] border-ink bg-ink text-paper">
        <Container
          size="lg"
          classes={{
            container:
              "flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm font-bold sm:px-10",
          }}
        >
          <p>&copy; {new Date().getFullYear()} Zololo Games</p>
          <a
            href="#"
            className="flex min-h-11 items-center rounded-lg px-2 underline decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-paper"
          >
            Back to top ↑
          </a>
        </Container>
      </div>
    </footer>
  );
}
