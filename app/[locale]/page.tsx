import Image from "next/image";
import Container from "./components/Container";
import GameCard from "./components/GameCard";
import { GAMES } from "./constants/games";
import logo from "@/public/images/brand/zololo-logo.png";

export default function Home() {
  return (
    <main className="flex-1 pt-28 pb-20 sm:pt-36">
      <Container classes={{ container: "flex flex-col gap-12 px-4 sm:px-10" }}>
        <header className="flex flex-col-reverse items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] text-balance">
              Tap a game to play.
            </h1>
            <p className="mt-5 max-w-2xl text-lg sm:text-xl text-ink/80">
              Short games for counting, sums, letters, shapes and more. Pick
              Easy (4–5), Medium (6–7) or Hard (8+) in every game. Free to play,
              nothing to sign up for.
            </p>
          </div>
          <Image
            src={logo}
            alt="Zololo Games"
            priority
            sizes="(min-width: 768px) 28rem, 90vw"
            className="w-full max-w-xs self-center sm:max-w-sm md:max-w-md md:shrink-0"
          />
        </header>

        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 min-[420px]:grid-cols-2 lg:grid-cols-4">
          {GAMES.map((game, idx) => (
            <li key={game.href}>
              <GameCard
                game={game}
                tilt={idx % 2 === 0 ? "left" : "right"}
              />
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
