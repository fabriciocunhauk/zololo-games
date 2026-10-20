import type { Metadata } from "next";
import CountTheCrittersGame from "./components/CountTheCrittersGame";

export const metadata: Metadata = {
  title: "Count the Critters",
  description: "Count the animals and tap the right number.",
};

export default function CountTheCrittersPage() {
  return <CountTheCrittersGame />;
}
