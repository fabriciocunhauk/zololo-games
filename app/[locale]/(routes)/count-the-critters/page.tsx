import { permanentRedirect } from "next/navigation";

// The game was renamed; keep old links working.
export default function CountTheCrittersRedirect() {
  permanentRedirect("/count-the-animals");
}
