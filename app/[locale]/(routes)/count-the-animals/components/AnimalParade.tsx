import AnimalArt from "@/app/components/animals/AnimalArt";
import { ANIMALS } from "../constants/animals";

/** Intro art: every animal in the game, in a gently bouncing line. */
export default function AnimalParade() {
  return (
    <div aria-hidden className="flex justify-center gap-1.5 sm:gap-3">
      {ANIMALS.map(({ name, kind }, idx) => (
        <AnimalArt
          key={name}
          kind={kind}
          className="w-9 sm:w-14 h-auto motion-safe:animate-bounce"
          style={{
            animationDelay: `${idx * 110}ms`,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </div>
  );
}
