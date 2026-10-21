import { expect, test } from "@playwright/test";

test("start, pop the right bubble, reset and change difficulty", async ({
  page,
}) => {
  await page.goto("/bubble-pop");
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Start playing" }).click();

  // Appears once the 3-2-1-GO countdown has finished.
  const problem = page.getByTestId("math-problem");
  await expect(problem).toHaveText(/^\d+ [+-] \d+ = \?$/, { timeout: 10_000 });
  const [, a, op, b] = (await problem.textContent())!.match(
    /(\d+) ([+-]) (\d+)/
  )!;
  const answer = op === "+" ? +a + +b : +a - +b;

  const bubble = page.getByRole("button", {
    name: `Answer ${answer}`,
    exact: true,
  });
  await expect(bubble).toBeEnabled();
  // Bubbles never stop moving, so skip Playwright's stability wait. A
  // double-tap scores once: the second tap lands on a leaving bubble.
  await bubble.evaluate((el: HTMLElement) => {
    el.click();
    el.click();
  });

  await expect(page.getByRole("status")).toHaveText("🎉 Correct!");
  await expect(page.getByTestId("score")).toHaveText("10");
  await expect(page.getByTestId("stars")).toHaveAttribute("data-stars", "1");

  await page.getByRole("button", { name: "Reset game" }).click();
  await expect(page.getByTestId("score")).toHaveText("0");
  await expect(page.getByTestId("stars")).toHaveAttribute("data-stars", "0");

  // Wait for the countdown to clear before using the header again.
  await expect(problem).toBeVisible({ timeout: 10_000 });
  await page.getByRole("button", { name: "Change difficulty" }).click();
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Start playing" })).toBeVisible();
});
