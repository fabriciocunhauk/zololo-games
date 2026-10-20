import type { Metadata } from "next";
import FrogJumpGame from "./components/FrogJumpGame";

export const metadata: Metadata = {
  title: "Frog Jump",
  description:
    "Hop the frog along the number line to practise adding and taking away.",
};

export default function FrogJumpPage() {
  return <FrogJumpGame />;
}
