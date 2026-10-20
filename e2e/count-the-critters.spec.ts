import { expect, test } from "@playwright/test";

test("answering a round shows feedback and scores a correct count", async ({
  page,
}) => {
  await page.goto("/count-the-critters");
  const critters = page.getByTestId("critter");
  await expect(critters.first()).toBeVisible();
  const count = await critters.count();

  await page.getByRole("button", { name: String(count), exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("🎉 Great job!");
  await expect(page.getByTestId("score")).toHaveText("10");
});
