import Image from "next/image";
import Container from "./components/Container";
import Card from "./components/Card";
import Link from "next/link";
import blueyBingo from "@/public/images/memory-game/bluey-bingo-family.avif";
import bingo from "@/public/images/memory-game/bingo.png";
import globe from "@/public/globe.svg";
import window from "@/public/window.svg";
import file from "@/public/file.svg";
import nextIcon from "@/public/next.svg";
import vercel from "@/public/vercel.svg";
import { classNames } from "./utils/appearance";

const games = [
  {
    name: "Memory Cards",
    image: blueyBingo,
    link: "/memory-game",
    alt: "Memory Cards Game",
    bg: "bg-pink-primary",
  },
  {
    name: "Bingo",
    image: bingo,
    link: "#",
    alt: "Bingo Game",
    bg: "bg-blue-200",
  },
  {
    name: "World Explorer",
    image: globe,
    link: "#",
    alt: "World Explorer Game",
    bg: "bg-green-200",
  },
  {
    name: "Window Game",
    image: window,
    link: "#",
    alt: "Window Game",
    bg: "bg-yellow-200",
  },
  {
    name: "File Fun",
    image: file,
    link: "#",
    alt: "File Fun Game",
    bg: "bg-purple-200",
  },
  {
    name: "Next Up",
    image: nextIcon,
    link: "#",
    alt: "Next Up Game",
    bg: "bg-orange-200",
  },
  {
    name: "Vercel Race",
    image: vercel,
    link: "#",
    alt: "Vercel Race Game",
    bg: "bg-teal-200",
  },
];

type Game = (typeof games)[number];

function GameCard({ game, idx }: { game: Game; idx: number }) {
  return (
    <Card
      key={game.name}
      classes={{
        card: classNames(
          "w-50 h-50 xl:w-60 xl:h-64 flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:ring-4 hover:ring-pink-primary/40 transition-transform duration-200 shadow-xl border-4 border-pink-primary",
          game.bg,
          idx % 2 === 0 ? "rotate-1" : "-rotate-1"
        ),
      }}
    >
      <Link
        href={game.link}
        className="flex flex-col items-center w-full h-full focus:outline-pink-primary"
      >
        <div className="flex-1 flex items-center justify-center w-full">
          <Image
            src={game.image}
            alt={game.alt}
            className="object-contain w-full h-full max-h-28 drop-shadow-md"
            priority={idx === 0}
          />
        </div>
        <div className="mt-4 text-center w-full">
          <span className="block text-lg font-bold text-gray-800 drop-shadow-sm">
            {game.name}
          </span>
        </div>
      </Link>
    </Card>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-32 sm:py-0 bg-pink-secondary">
      <Container
        classes={{
          container:
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8",
        }}
      >
        {games.map((game, idx) => (
          <GameCard key={game.name} game={game} idx={idx} />
        ))}
      </Container>
    </main>
  );
}
