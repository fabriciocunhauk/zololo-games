import type { Metadata } from "next";
import PatternTrainGame from "./components/PatternTrainGame";

export const metadata: Metadata = {
  title: "Pattern Train",
  description:
    "Monsters ride the train in a pattern. Spot who belongs in the empty carriage and help the train chuff along.",
};

export default function PatternTrainPage() {
  return <PatternTrainGame />;
}
