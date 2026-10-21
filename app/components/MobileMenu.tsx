"use client";
import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import type { NavItem } from "@/app/constants/navItems";
import { useMessages } from "@/app/i18n/LocaleProvider";
import NavLink from "./NavLink";

const iconButtonClasses =
  "flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-ink/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink";

export default function MobileMenu({
  items,
}: {
  items: ReadonlyArray<NavItem>;
}) {
  const { nav } = useMessages();
  const [isOpen, setIsOpen] = useState(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const close = () => setIsOpen(false);

  // Move focus into the menu when it opens and back to the toggle when it closes.
  useEffect(() => {
    if (isOpen) closeButton.current?.focus();
    else if (wasOpen.current) openButton.current?.focus();
    wasOpen.current = isOpen;
  }, [isOpen]);

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
        ref={openButton}
        type="button"
        aria-label={nav.openMenu}
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
          role="dialog"
          aria-modal="true"
          aria-label={nav.menu}
          className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-paper px-4 py-3"
        >
          <button
            ref={closeButton}
            type="button"
            aria-label={nav.closeMenu}
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
