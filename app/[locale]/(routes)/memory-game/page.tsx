import type { Metadata } from "next";
import MemoryGame from "./components/MemoryGame";

export const metadata: Metadata = {
  title: "Memory Cards",
  description: "Flip the cards and find the matching pairs.",
};

export default function MemoryGamePage() {
  return <MemoryGame />;
}
