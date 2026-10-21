import type { Metadata } from "next";
import BubblePopGame from "./components/BubblePopGame";

export const metadata: Metadata = {
  title: "Bubble Pop",
  description:
    "Work out the sum, then pop the bubble with the right answer. Adding and taking away for ages 4 to 8+.",
};

export default function BubblePopPage() {
  return <BubblePopGame />;
}
