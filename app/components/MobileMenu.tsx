"use client";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import type { NavItem } from "@/app/constants/navItems";
import NavLink from "./NavLink";

const iconButtonClasses =
  "flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-ink/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink";

export default function MobileMenu({
  items,
}: {
  items: ReadonlyArray<NavItem>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className="2xl:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen(true)}
        className={iconButtonClasses}
      >
        <GiHamburgerMenu className="h-5 w-5" />
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-paper px-4 py-3"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className={`${iconButtonClasses} self-end`}
          >
            <IoMdClose className="h-8 w-8" />
          </button>
          <ul className="mt-10 flex flex-col items-center gap-8 text-2xl">
            {items.map(({ label, href }) => (
              <li key={href}>
                <NavLink href={href} onNavigate={close}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
