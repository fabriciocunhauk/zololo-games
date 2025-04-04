import React from "react";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import Image from "next/image";
import blueyBingo from "@/public/images/bluey-bingo.jpg";
import bluey from "@/public/images/bluey.jpg";
import bingo from "@/public/images/bingo.png";
import blueyBingoFamily from "@/public/images/bluey-bingo-family.avif";
// import blueyBingo from "@/public/images/bluey-bingo.jpg";

const cards = [
  {
    id: 1,
    image: blueyBingoFamily,
  },
  {
    id: 2,
    image: bluey,
  },
  {
    id: 3,
    image: blueyBingo,
  },
  {
    id: 4,
    image: bingo,
  },
  {
    id: 5,
    image: blueyBingoFamily,
  },
  {
    id: 6,
    image: bingo,
  },
  {
    id: 5,
    image: blueyBingo,
  },
  {
    id: 6,
    image: bluey,
  },
];

function page() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Container classes={{ container: "grid grid-cols-4 gap-10 z-20" }}>
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              classes={{
                card: "w-40 h-40 odd:bg-blue-500 even:bg-pink-primary",
              }}
            >
              <Image
                className="object-cover h-full w-full"
                src={card.image.src}
                width={card.image.width}
                height={card.image.height}
                alt="Logo"
              />
            </Card>
          );
        })}
      </Container>
    </main>
  );
}

export default page;
