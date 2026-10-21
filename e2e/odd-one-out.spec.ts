import { expect, test, type Locator, type Page } from "@playwright/test";

async function start(page: Page) {
  await page.goto("/odd-one-out");
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Start playing" }).click();
  await expect(page.getByTestId("question")).toBeVisible();
}

/** The tile whose look differs from all the others. */
async function oddTile(tiles: Locator): Promise<Locator> {
  const looks = await tiles.evaluateAll((els) =>
    els.map((el) => el.getAttribute("data-look"))
  );
  const odd = looks.findIndex(
    (look) => looks.filter((other) => other === look).length === 1
  );
  expect(odd).toBeGreaterThanOrEqual(0);
  return tiles.nth(odd);
}

test("intro shows how to play and a difficulty picker", async ({ page }) => {
  await page.goto("/odd-one-out");
  await expect(page).toHaveTitle("Odd One Out · Zololo Games");
  await expect(
    page.getByRole("heading", { name: "Odd One Out", level: 1 })
  ).toBeVisible();
  await expect(page.locator("#how-to-play + ol > li")).toHaveCount(3);
  const picker = page.getByRole("radiogroup", { name: "Who's playing?" });
  await expect(picker.getByRole("radio")).toHaveCount(3);
  await expect(page.getByTestId("monster-tile")).toHaveCount(0);
});

test("easy deals four monsters and spotting the odd one earns a star", async ({
  page,
}) => {
  await start(page);
  const tiles = page.getByTestId("monster-tile");
  await expect(tiles).toHaveCount(4);
  await expect(tiles.first()).toHaveAccessibleName("Monster 1");
  await expect(page.getByTestId("level")).toHaveText("1");

  await (await oddTile(tiles)).click();
  await expect(page.getByRole("status")).toContainText("You spotted it!");
  await expect(page.getByTestId("stars")).toHaveAttribute("data-stars", "1");
});

test("hard deals nine monsters", async ({ page }) => {
  await page.goto("/odd-one-out");
  await page.getByRole("radio", { name: /^Hard/ }).click();
  await expect(page.getByRole("radio", { name: /^Hard/ })).toHaveAttribute(
    "aria-checked",
    "true"
  );
  await page.getByRole("button", { name: "Start playing" }).click();
  await expect(page.getByTestId("monster-tile")).toHaveCount(9);
});

test("change difficulty returns to the intro", async ({ page }) => {
  await start(page);
  await page.getByRole("button", { name: "Change difficulty" }).click();
  await expect(
    page.getByRole("button", { name: "Start playing" })
  ).toBeVisible();
  await expect(page.getByTestId("monster-tile")).toHaveCount(0);
});
