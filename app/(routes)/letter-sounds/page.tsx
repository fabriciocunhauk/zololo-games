import type { Metadata } from "next";
import LetterSoundsGame from "./components/LetterSoundsGame";

export const metadata: Metadata = {
  title: "Letter Sounds",
  description:
    "Look at the picture, hear the word and pick the letter it starts with. On Hard, spell three-letter words.",
};

export default function LetterSoundsPage() {
  return <LetterSoundsGame />;
}
