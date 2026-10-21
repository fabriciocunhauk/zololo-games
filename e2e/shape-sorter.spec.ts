import { expect, test, type Page } from "@playwright/test";

async function startEasy(page: Page) {
  await page.goto("/shape-sorter");
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
  const easy = page.getByRole("radio", { name: /^Easy/ });
  await easy.click();
  await expect(easy).toHaveAttribute("aria-checked", "true");
  await page.getByRole("button", { name: "Start playing" }).click();
  await expect(page.getByTestId("sorted")).toHaveText("0/10");
}

/** The bin the current shape belongs in (waits for the next shape to arrive). */
async function rightBin(page: Page) {
  const belongs = await page
    .locator("[data-belongs]")
    .getAttribute("data-belongs");
  expect(belongs).toBeTruthy();
  return belongs!;
}

test("intro shows how to play and a difficulty radio group", async ({
  page,
}) => {
  await page.goto("/shape-sorter");
  await expect(page).toHaveTitle("Shape Sorter · Zololo Games");
  await expect(
    page.getByRole("heading", { name: "Shape Sorter", level: 1 })
  ).toBeVisible();
  await expect(page.locator("#how-to-play + ol > li")).toHaveCount(3);
  const group = page.getByRole("radiogroup", { name: "Who's playing?" });
  await expect(group.getByRole("radio")).toHaveCount(3);
  await expect(page.locator("[data-bin]")).toHaveCount(0);
});

test("easy sorts by colour into two bins", async ({ page }) => {
  await startEasy(page);
  await expect(page.getByTestId("difficulty")).toContainText("Easy");
  await expect(page.getByTestId("question")).toHaveText("What colour is it?");
  await expect(page.locator("[data-bin]")).toHaveCount(2);
  await expect(page.getByTestId("shape")).toHaveAccessibleName(
    /^an? (\w+ )*(circle|square)$/
  );

  const belongs = await rightBin(page);
  const bin = page.locator(`[data-bin="${belongs}"]`);
  await expect(bin).toHaveCount(1);
  await bin.click();
  await expect(page.getByTestId("sorted")).toHaveText("1/10");
  await expect(page.getByRole("status")).toContainText("Yes!");
  await expect(bin).toHaveAccessibleName(/, 1 sorted$/);
});

test("a wrong bin asks the child to try another", async ({ page }) => {
  await startEasy(page);
  const belongs = await rightBin(page);

  await page.locator(`[data-bin]:not([data-bin="${belongs}"])`).click();
  await expect(page.getByRole("status")).toHaveText(
    "Not that one! Try another bin."
  );
  await expect(page.getByTestId("sorted")).toHaveText("0/10");

  // The same shape waits for another go.
  await expect(page.locator("[data-belongs]")).toHaveAttribute(
    "data-belongs",
    belongs
  );
  await page.locator(`[data-bin="${belongs}"]`).click();
  await expect(page.getByTestId("sorted")).toHaveText("1/10");
});

test("sorting all 10 shapes completes the round and earns a star", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await startEasy(page);
  for (let n = 1; n <= 10; n++) {
    const belongs = await rightBin(page);
    await page.locator(`[data-bin="${belongs}"]`).click();
    await expect(page.getByTestId("sorted")).toHaveText(`${n}/10`);
  }
  await expect(page.getByRole("status")).toContainText("Round complete!");
  await expect(page.getByTestId("stars")).toHaveAttribute("data-stars", "1");
  await expect(page.getByTestId("sorted")).toHaveText("0/10", {
    timeout: 10_000,
  });
});

test("change difficulty returns to the intro", async ({ page }) => {
  await startEasy(page);
  await page.getByRole("button", { name: "Change difficulty" }).click();
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Start playing" })
  ).toBeVisible();
  await expect(page.locator("[data-bin]")).toHaveCount(0);
});
