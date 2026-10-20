import { expect, test } from "@playwright/test";

test("level 1 deals four cards and flipping two counts a move", async ({
  page,
}) => {
  await page.goto("/memory-game");
  const cards = page.getByRole("button", { name: /face down/ });
  await expect(cards).toHaveCount(4);
  await expect(page.getByTestId("level")).toHaveText("1");

  await page.getByRole("button", { name: "Card 1, face down" }).click();
  await page.getByRole("button", { name: "Card 2, face down" }).click();
  await expect(page.getByTestId("moves")).toHaveText("1");

  await page.getByRole("button", { name: "Reset game" }).click();
  await expect(page.getByTestId("moves")).toHaveText("0");
  await expect(cards).toHaveCount(4);
});
