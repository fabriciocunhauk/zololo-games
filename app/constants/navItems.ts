import { GAMES } from "./games";

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: ReadonlyArray<NavItem> = Object.freeze([
  { label: "Home", href: "/" },
  ...GAMES.map(({ name, href }) => ({ label: name, href })),
]);
