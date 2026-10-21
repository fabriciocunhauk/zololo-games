import { gameMetadata } from "@/app/i18n/pageMetadata";
import MemoryGame from "./components/MemoryGame";

export const generateMetadata = gameMetadata("memory-game");

export default function MemoryGamePage() {
  return <MemoryGame />;
}
