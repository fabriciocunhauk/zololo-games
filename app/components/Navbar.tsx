import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/app/constants/navItems";
import logo from "@/public/images/zololo-logo.png";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-6 border-b-[3px] border-ink bg-pink-primary px-4 py-3"
    >
      <Link
        href="/"
        className="w-36 lg:w-44 mix-blend-multiply rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink"
      >
        <Image src={logo} alt="Zololo Games home" priority />
      </Link>

      <ul className="hidden lg:flex items-center gap-8">
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={href}>
            <NavLink href={href}>{label}</NavLink>
          </li>
        ))}
      </ul>

      <MobileMenu items={NAV_ITEMS} />
    </nav>
  );
}
