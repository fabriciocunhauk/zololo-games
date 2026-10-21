import { gameMetadata } from "@/app/i18n/pageMetadata";
import PatternTrainGame from "./components/PatternTrainGame";

export const generateMetadata = gameMetadata("pattern-train");

export default function PatternTrainPage() {
  return <PatternTrainGame />;
}
