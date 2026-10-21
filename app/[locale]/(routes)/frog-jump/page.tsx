import { gameMetadata } from "@/app/i18n/pageMetadata";
import FrogJumpGame from "./components/FrogJumpGame";

export const generateMetadata = gameMetadata("frog-jump");

export default function FrogJumpPage() {
  return <FrogJumpGame />;
}
