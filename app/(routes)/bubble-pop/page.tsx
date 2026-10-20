import type { Metadata } from "next";
import BubblePopGame from "./components/BubblePopGame";

export const metadata: Metadata = {
  title: "Bubble Pop",
  description: "Solve the sum and pop the bubble with the right answer.",
};

export default function BubblePopPage() {
  return <BubblePopGame />;
}
