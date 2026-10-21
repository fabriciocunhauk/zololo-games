import { expect, test, type Page } from "@playwright/test";

async function openIntro(page: Page) {
  await page.goto("/letter-sounds");
  await expect(page).toHaveTitle("Letter Sounds · Zololo Games");
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
}

test("easy: picking the first letter earns a star", async ({ page }) => {
  await openIntro(page);
  await page.getByRole("radio", { name: "Easy, ages 4 to 5" }).click();
  await page.getByRole("button", { name: "Start playing" }).click();

  const blanked = page.getByTestId("word");
  await expect(blanked).toHaveText(/^_[a-z-]+$/);
  const word = await page.getByTestId("picture-card").getAttribute("data-word");
  expect(word).toBeTruthy();
  expect(await blanked.textContent()).toBe(`_${word!.slice(1)}`);

  const letter = word!.charAt(0).toUpperCase();
  await page.getByRole("button", { name: letter, exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Yes!");
  await expect(page.getByTestId("stars")).toHaveAttribute("data-stars", "1");
});

test("hard: shows three spelling slots, and change difficulty returns to the intro", async ({
  page,
}) => {
  await openIntro(page);
  await page.getByRole("radio", { name: "Hard, ages 8 and up" }).click();
  await page.getByRole("button", { name: "Start playing" }).click();

  await expect(page.getByTestId("difficulty")).toHaveText("Hard · Ages 8+");
  await expect(page.getByTestId("question")).toHaveText("Spell the word");
  await expect(page.getByTestId("slot")).toHaveCount(3);

  await page.getByRole("button", { name: "Change difficulty" }).click();
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
  await expect(
    page.getByRole("radio", { name: "Hard, ages 8 and up" })
  ).toHaveAttribute("aria-checked", "true");
});
