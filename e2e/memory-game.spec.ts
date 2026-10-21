import { expect, test, type Page } from "@playwright/test";

async function start(page: Page) {
  await page.goto("/memory-game");
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Start playing" }).click();
}

test("intro explains the game before the first deal", async ({ page }) => {
  await page.goto("/memory-game");
  await expect(
    page.getByRole("heading", { name: "Memory Cards", level: 1 })
  ).toBeVisible();
  await expect(page.locator("#how-to-play + ol > li")).toHaveCount(3);
  await expect(page.locator("[data-state]")).toHaveCount(0);
});

test("level 1 deals four cards and flipping two counts a move", async ({
  page,
}) => {
  await start(page);
  const cards = page.locator("[data-state]");
  await expect(cards).toHaveCount(4);
  await expect(page.getByTestId("level")).toHaveText("1");
  await expect(page.getByTestId("pairs")).toHaveText("0/2");

  await page.getByRole("button", { name: "Card 1, face down" }).click();
  await page.getByRole("button", { name: "Card 2, face down" }).click();
  await expect(page.getByTestId("moves")).toHaveText("1");

  await page.getByRole("button", { name: "Restart level" }).click();
  await expect(page.getByTestId("moves")).toHaveText("0");
  await expect(cards).toHaveCount(4);
});

test("matching every pair levels up to a bigger deck", async ({ page }) => {
  await start(page);
  const card = (pos: number) => page.locator("[data-state]").nth(pos);
  const won = page.getByText("You found every pair!");

  // Level 1 has 4 cards: trying each pair of face-down cards always solves it.
  for (let a = 0; a < 4; a++) {
    for (let b = a + 1; b < 4; b++) {
      if (await won.isVisible()) break;
      if ((await card(a).getAttribute("data-state")) !== "down") continue;
      if ((await card(b).getAttribute("data-state")) !== "down") continue;
      await card(a).click();
      await card(b).click();
      await expect(page.locator('[data-state="up"]')).toHaveCount(0);
    }
  }

  await expect(won).toBeVisible();
  await expect(page.getByText("Get ready for level 2…")).toBeVisible();
  await expect(page.getByTestId("level")).toHaveText("2", { timeout: 5000 });
  await expect(page.locator("[data-state]")).toHaveCount(8);
});

test("how to play can be reopened during a game", async ({ page }) => {
  await start(page);
  await page.getByText("Show how to play").click();
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
});

test("hard deals a bigger first board and the choice is remembered", async ({
  page,
}) => {
  await page.goto("/memory-game");
  const hard = page.getByRole("radio", { name: "Hard, ages 8 and up" });
  await hard.click();
  await expect(hard).toHaveAttribute("aria-checked", "true");
  await page.getByRole("button", { name: "Start playing" }).click();

  await expect(page.getByTestId("difficulty")).toHaveText("Hard · Ages 8+");
  await expect(page.locator("[data-state]")).toHaveCount(12);

  await page.getByRole("button", { name: "Change difficulty" }).click();
  await expect(hard).toHaveAttribute("aria-checked", "true");

  await page.reload();
  await expect(
    page.getByRole("radio", { name: "Hard, ages 8 and up" })
  ).toHaveAttribute("aria-checked", "true");
});
