import { gameMetadata } from "@/app/i18n/pageMetadata";
import OddOneOutGame from "./components/OddOneOutGame";

export const generateMetadata = gameMetadata("odd-one-out");

export default function OddOneOutPage() {
  return <OddOneOutGame />;
}
