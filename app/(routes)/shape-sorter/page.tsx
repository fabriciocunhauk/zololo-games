import type { Metadata } from "next";
import ShapeSorterGame from "./components/ShapeSorterGame";

export const metadata: Metadata = {
  title: "Shape Sorter",
  description:
    "Tap the right bin to sort each shape by colour, by shape or by how many sides it has.",
};

export default function ShapeSorterPage() {
  return <ShapeSorterGame />;
}
