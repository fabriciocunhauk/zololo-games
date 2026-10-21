import { gameMetadata } from "@/app/i18n/pageMetadata";
import BubblePopGame from "./components/BubblePopGame";

export const generateMetadata = gameMetadata("bubble-pop");

export default function BubblePopPage() {
  return <BubblePopGame />;
}
