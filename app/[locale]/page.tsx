import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/app/components/Container";
import GameCard from "@/app/components/GameCard";
import { GAMES } from "@/app/constants/games";
import type { Locale } from "@/app/i18n/locales";
import { MESSAGES } from "@/app/i18n/messages";
import { pageMetadata } from "@/app/i18n/pageMetadata";
import logo from "@/public/images/brand/zololo-logo.png";

type HomeProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/", {
    description: MESSAGES[locale].site.description,
  });
}

export default async function Home({ params }: HomeProps) {
  const locale = (await params).locale as Locale;
  const text = MESSAGES[locale];

  return (
    <main className="flex-1 pt-28 pb-20 sm:pt-36">
      <Container classes={{ container: "flex flex-col gap-12 px-4 sm:px-10" }}>
        <header className="flex flex-col-reverse items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] text-balance">
              {text.home.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-lg sm:text-xl text-ink/80">
              {text.home.blurb}
            </p>
          </div>
          <Image
            src={logo}
            alt={text.site.logoAlt}
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
                locale={locale}
                tilt={idx % 2 === 0 ? "left" : "right"}
              />
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
