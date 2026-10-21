import type { Metadata } from "next";
import CountingGame from "./components/CountingGame";

export const metadata: Metadata = {
  title: "Count the Animals",
  description:
    "Tap each animal to count it, then pick the right number. Three levels, counting up to 10.",
};

export default function CountTheAnimalsPage() {
  return <CountingGame />;
}
