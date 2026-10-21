import { gameMetadata } from "@/app/i18n/pageMetadata";
import ShapeSorterGame from "./components/ShapeSorterGame";

export const generateMetadata = gameMetadata("shape-sorter");

export default function ShapeSorterPage() {
  return <ShapeSorterGame />;
}
