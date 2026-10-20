import { expect, test } from "@playwright/test";

test("start, count down, pop the right bubble and score", async ({ page }) => {
  await page.goto("/bubble-pop");
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Start game" }).click();

  const problem = page.getByTestId("math-problem");
  await expect(problem).toHaveText(/^\d+ [+-] \d+ = \?$/, { timeout: 10_000 });
  const [, a, op, b] = (await problem.textContent())!.match(
    /(\d+) ([+-]) (\d+)/
  )!;
  const answer = op === "+" ? +a + +b : +a - +b;

  const bubble = page.getByRole("button", { name: `Answer ${answer}` });
  await expect(bubble).toBeEnabled();
  // Bubbles never stop moving, so skip Playwright's stability wait.
  await bubble.dispatchEvent("click");

  await expect(page.getByRole("status")).toHaveText("🎉 Correct!");
  await expect(page.getByTestId("score")).toHaveText("10");

  await page.getByRole("button", { name: "Reset game" }).click();
  await expect(page.getByTestId("score")).toHaveText("0");
  await expect(page.getByRole("button", { name: "Start game" })).toBeVisible();
});
