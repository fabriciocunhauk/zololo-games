import type { Metadata } from "next";
import OddOneOutGame from "./components/OddOneOutGame";

export const metadata: Metadata = {
  title: "Odd One Out",
  description:
    "The monsters all match except one. Look closely and tap the odd one out!",
};

export default function OddOneOutPage() {
  return <OddOneOutGame />;
}
