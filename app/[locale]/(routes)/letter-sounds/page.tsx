import { gameMetadata } from "@/app/i18n/pageMetadata";
import LetterSoundsGame from "./components/LetterSoundsGame";

export const generateMetadata = gameMetadata("letter-sounds");

export default function LetterSoundsPage() {
  return <LetterSoundsGame />;
}
