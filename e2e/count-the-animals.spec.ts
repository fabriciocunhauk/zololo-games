import { expect, test, type Page } from "@playwright/test";

async function start(page: Page) {
  await page.goto("/count-the-animals");
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Start playing" }).click();
  await expect(page.getByTestId("question")).toHaveText(/^How many \w+\?$/);
}

const optionButton = (page: Page, n: number) =>
  page.getByRole("button", { name: String(n), exact: true });

test("old critters link redirects to the renamed game", async ({ page }) => {
  await page.goto("/count-the-critters");
  await expect(page).toHaveURL("/count-the-animals");
  await expect(page).toHaveTitle("Count the Animals · Zololo Games");
});

test("tapping animals numbers them and the right answer earns a star", async ({
  page,
}) => {
  await start(page);
  const animals = page.getByTestId("animal");
  const total = await animals.count();
  expect(total).toBeGreaterThanOrEqual(1);
  expect(total).toBeLessThanOrEqual(5);

  await animals.nth(0).click();
  await expect(animals.nth(0)).toHaveAccessibleName(/counted 1$/);
  await expect(page.getByText("You counted 1.")).toBeVisible();

  await page.getByRole("button", { name: "Count again" }).click();
  await expect(animals.nth(0)).toHaveAccessibleName(/not counted yet$/);

  for (let i = 0; i < total; i++) await animals.nth(i).click();
  await expect(page.getByText(`You counted ${total}.`)).toBeVisible();

  await optionButton(page, total).click();
  await expect(page.getByRole("status")).toContainText("Yes!");
  await expect(page.getByTestId("stars")).toHaveAttribute("data-stars", "1");
});

test("a wrong answer counts along and then shows the answer", async ({
  page,
}) => {
  await start(page);
  const total = await page.getByTestId("animal").count();
  const options = await page
    .getByRole("button", { name: /^\d+$/ })
    .allTextContents();
  const wrong = options.map(Number).find((n) => n !== total)!;

  await optionButton(page, wrong).click();
  await expect(page.getByRole("status")).toHaveText(
    "Not quite! Let's count them together."
  );
  await expect(page.getByTestId("animal").nth(total - 1)).toHaveAccessibleName(
    new RegExp(`counted ${total}$`),
    { timeout: 10_000 }
  );
  await expect(page.getByRole("status")).toContainText(`There are ${total}`, {
    timeout: 10_000,
  });
  await expect(page.getByTestId("stars")).toHaveAttribute("data-stars", "0");
});

test("five right answers move up to level 2", async ({ page }) => {
  test.setTimeout(60_000);
  await start(page);
  for (let round = 1; round <= 5; round++) {
    const question = page.getByTestId("question");
    const asked = await question.textContent();
    const total = await page.getByTestId("animal").count();
    await optionButton(page, total).click();
    await expect(page.getByRole("status")).toContainText("Yes!");
    if (round < 5) await expect(question).not.toHaveText(asked!);
  }
  await expect(page.getByRole("status")).toContainText("Level up!");
  await expect(page.getByTestId("level")).toHaveText("2");
});

test("hard asks for bigger counts and can go back to the intro", async ({
  page,
}) => {
  await page.goto("/count-the-animals");
  await page.getByRole("radio", { name: "Hard, ages 8 and up" }).click();
  await page.getByRole("button", { name: "Start playing" }).click();

  await expect(page.getByTestId("difficulty")).toHaveText("Hard · Ages 8+");
  const total = await page.getByTestId("animal").count();
  expect(total).toBeGreaterThanOrEqual(5);
  expect(total).toBeLessThanOrEqual(10);

  await page.getByRole("button", { name: "Change difficulty" }).click();
  await expect(
    page.getByRole("heading", { name: "Count the Animals", level: 1 })
  ).toBeVisible();
  await expect(
    page.getByRole("radio", { name: "Hard, ages 8 and up" })
  ).toHaveAttribute("aria-checked", "true");
});
