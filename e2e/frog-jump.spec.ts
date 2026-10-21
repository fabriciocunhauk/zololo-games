import { expect, test, type Page } from "@playwright/test";

const PROBLEM = /^Start at (\d+), jump ([+-]) (\d+)\.$/;

async function readProblem(page: Page) {
  const problem = page.getByTestId("jump-problem");
  await expect(problem).toHaveText(PROBLEM);
  const [, start, operation, jump] = (await problem.textContent())!.match(
    PROBLEM,
  )!;
  const answer = operation === "+" ? +start + +jump : +start - +jump;
  return { start: +start, operation, jump: +jump, answer };
}

test("intro explains the game and offers three age levels", async ({
  page,
}) => {
  await page.goto("/frog-jump");
  await expect(
    page.getByRole("heading", { name: "Frog Jump", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "How to play" }),
  ).toBeVisible();
  await expect(page.locator("#how-to-play + ol > li")).toHaveCount(3);
  await expect(page.getByRole("radiogroup")).toBeVisible();
  await expect(page.getByRole("radio")).toHaveCount(3);
  await expect(page.getByRole("radio", { name: /^Easy/ })).toBeChecked();
  await expect(page.getByTestId("jump-problem")).toHaveCount(0);
});

test("picking where the frog lands earns a star", async ({ page }) => {
  await page.goto("/frog-jump");
  await page.getByRole("button", { name: "Start playing" }).click();

  const { start, operation, jump, answer } = await readProblem(page);
  // Easy: forward jumps of 1 to 3 on a 0–10 line.
  expect(operation).toBe("+");
  expect(jump).toBeGreaterThanOrEqual(1);
  expect(jump).toBeLessThanOrEqual(3);
  expect(start).toBeGreaterThanOrEqual(0);
  expect(answer).toBeLessThanOrEqual(10);
  await expect(page.getByTestId("level")).toHaveText("1");

  const option = page.getByRole("button", {
    name: String(answer),
    exact: true,
  });
  await expect(option).toBeEnabled();
  await option.click();
  await expect(page.getByRole("status")).toHaveText("🎉 Excellent!");
  await expect(page.getByTestId("stars")).toHaveAttribute("data-stars", "1");
});

test("Hard uses a 0–30 line and is remembered after changing difficulty", async ({
  page,
}) => {
  await page.goto("/frog-jump");
  const hard = page.getByRole("radio", { name: "Hard, ages 8 and up" });
  await hard.click();
  await expect(hard).toBeChecked();
  await page.getByRole("button", { name: "Start playing" }).click();

  const { start, jump, answer } = await readProblem(page);
  for (const n of [start, answer]) {
    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThanOrEqual(30);
  }
  expect(jump).toBeGreaterThanOrEqual(2);
  expect(jump).toBeLessThanOrEqual(10);
  await expect(page.getByTestId("difficulty")).toContainText("Hard");

  await page.getByRole("button", { name: "Change difficulty" }).click();
  await expect(
    page.getByRole("heading", { name: "How to play" }),
  ).toBeVisible();
  await expect(
    page.getByRole("radio", { name: "Hard, ages 8 and up" }),
  ).toBeChecked();
});

test("changing difficulty from the top level of Medium goes back to the intro", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.goto("/frog-jump");
  await page.getByRole("radio", { name: /^Medium/ }).click();
  await page.getByRole("button", { name: "Start playing" }).click();

  // Ten right answers reach level 3, which Easy (2 levels) doesn't have.
  for (let round = 1; round <= 10; round++) {
    const { answer } = await readProblem(page);
    await page.getByRole("button", { name: String(answer), exact: true }).click();
    await expect(page.getByRole("status")).toContainText("Excellent!");
    if (round < 10) {
      await expect(page.getByRole("status")).toBeEmpty({ timeout: 5000 });
    }
  }
  await expect(page.getByTestId("level")).toHaveText("3");

  await page.getByRole("button", { name: "Change difficulty" }).click();
  await expect(
    page.getByRole("heading", { name: "Frog Jump", level: 1 })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Start playing" })).toBeVisible();
});

test("keyboard focus stays on the answers when a new round starts", async ({
  page,
}) => {
  await page.goto("/frog-jump");
  await page.getByRole("button", { name: "Start playing" }).click();
  const { answer } = await readProblem(page);
  const option = page.getByRole("button", { name: String(answer), exact: true });
  await option.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toContainText("Excellent!");
  await expect(page.getByRole("status")).toBeEmpty({ timeout: 5000 });
  await expect
    .poll(() =>
      page.evaluate(() => document.activeElement?.closest("[role=group]") !== null)
    )
    .toBe(true);
});
