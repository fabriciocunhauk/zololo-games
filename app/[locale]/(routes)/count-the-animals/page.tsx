import { gameMetadata } from "@/app/i18n/pageMetadata";
import CountingGame from "./components/CountingGame";

export const generateMetadata = gameMetadata("count-the-animals");

export default function CountTheAnimalsPage() {
  return <CountingGame />;
}
