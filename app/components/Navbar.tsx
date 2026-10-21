import Link from "next/link";
import { NAV_ITEMS } from "@/app/constants/navItems";
import Logo from "./Logo";
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
        aria-label="Zololo Games home"
        className="rounded py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink"
      >
        <Logo className="h-9 2xl:h-11" />
      </Link>

      <ul className="hidden 2xl:flex items-center gap-6 whitespace-nowrap">
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
