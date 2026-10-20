"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export default function NavLink({ href, children, onNavigate }: NavLinkProps) {
  const isActive = usePathname() === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className="font-bold border-b-[3px] border-transparent pb-0.5 transition-colors hover:border-ink aria-[current=page]:border-ink rounded-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink"
    >
      {children}
    </Link>
  );
}
