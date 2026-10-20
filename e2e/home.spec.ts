import { expect, test } from "@playwright/test";

const games = [
  { name: "Memory Cards", path: "/memory-game" },
  { name: "Count the Critters", path: "/count-the-critters" },
  { name: "Frog Jump", path: "/frog-jump" },
  { name: "Bubble Pop", path: "/bubble-pop" },
];

test("home lists every game and each tile opens it", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Zololo Games");
  await expect(
    page.getByRole("heading", { name: "Tap a game to play." })
  ).toBeVisible();

  const main = page.getByRole("main");
  for (const game of games) {
    await main.getByRole("link", { name: new RegExp(game.name) }).click();
    await expect(page).toHaveURL(game.path);
    await expect(page).toHaveTitle(`${game.name} · Zololo Games`);
    await page.goBack();
  }
});

test("desktop nav links to every game and marks the current page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(
    nav.getByRole("link", { name: "Home", exact: true })
  ).toHaveAttribute("aria-current", "page");

  await nav.getByRole("link", { name: "Frog Jump" }).click();
  await expect(page).toHaveURL("/frog-jump");
  await expect(nav.getByRole("link", { name: "Frog Jump" })).toHaveAttribute(
    "aria-current",
    "page"
  );
  await expect(
    nav.getByRole("link", { name: "Home", exact: true })
  ).not.toHaveAttribute("aria-current", "page");
});

test("mobile menu opens, navigates and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "Bubble Pop" })
    .click();
  await expect(page).toHaveURL("/bubble-pop");
  await expect(page.locator("#mobile-menu")).toBeHidden();
});
