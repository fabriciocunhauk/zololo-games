import type { Metadata } from "next";
import FrogJumpGame from "./components/FrogJumpGame";

export const metadata: Metadata = {
  title: "Frog Jump",
  description:
    "Hop the frog along a lily-pad number line to practise adding and taking away. Easy for ages 4–5, Medium for ages 6–7 and Hard for ages 8+.",
};

export default function FrogJumpPage() {
  return <FrogJumpGame />;
}
