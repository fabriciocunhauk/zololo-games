import { expect, test, type Page } from "@playwright/test";

const TITLE = "Pattern Train";

async function openIntro(page: Page) {
  await page.goto("/pattern-train");
  await expect(
    page.getByRole("heading", { name: TITLE, level: 1 })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "How to play" })
  ).toBeVisible();
}

async function start(page: Page) {
  await openIntro(page);
  await page.getByRole("button", { name: "Start playing" }).click();
  await expect(page.getByTestId("gap")).toHaveCount(1);
}

const answerOptions = (page: Page) =>
  page
    .getByRole("group", { name: "Who rides in the empty carriage?" })
    .getByRole("button");

/** Options that can still be picked (locked ones stay on screen, aria-disabled). */
const openOptions = (page: Page) =>
  answerOptions(page).and(page.locator(':not([aria-disabled="true"])'));

test("intro explains the game and offers three difficulties", async ({
  page,
}) => {
  await openIntro(page);
  await expect(page).toHaveTitle(`${TITLE} · Zololo Games`);
  await expect(page.locator("#how-to-play + ol > li")).toHaveCount(3);

  const picker = page.getByRole("radiogroup", { name: "Who's playing?" });
  await expect(picker.getByRole("radio")).toHaveCount(3);
  await expect(picker.getByRole("radio", { name: /^Easy/ })).toBeChecked();

  await picker.getByRole("radio", { name: /^Hard/ }).click();
  await expect(picker.getByRole("radio", { name: /^Hard/ })).toBeChecked();
  await expect(page.getByTestId("carriage")).toHaveCount(0);
});

test("easy starts with a four-carriage train and three options", async ({
  page,
}) => {
  await start(page);
  await expect(page.getByTestId("difficulty")).toContainText("Easy");
  await expect(page.getByTestId("level")).toHaveText("1");
  await expect(page.getByTestId("stars")).toHaveAttribute("data-stars", "0");
  await expect(page.getByTestId("carriage")).toHaveCount(3);
  await expect(page.getByTestId("gap")).toHaveCount(1);
  await expect(answerOptions(page)).toHaveCount(3);
});

test("hard starts with a seven-carriage train and four options", async ({
  page,
}) => {
  await openIntro(page);
  await page.getByRole("radio", { name: /^Hard/ }).click();
  await page.getByRole("button", { name: "Start playing" }).click();
  await expect(page.getByTestId("difficulty")).toContainText("Hard");
  await expect(page.getByTestId("carriage")).toHaveCount(6);
  await expect(page.getByTestId("gap")).toHaveCount(1);
  await expect(answerOptions(page)).toHaveCount(4);
});

test("picking any option gives feedback", async ({ page }) => {
  await start(page);
  // The options unlock once the train has pulled in.
  await expect(answerOptions(page).first()).toBeEnabled();
  await answerOptions(page).first().click();
  await expect(page.getByRole("status")).toHaveText(
    /Choo choo|Not quite/
  );
});

test("a wrong pick can be retried, and the right one earns a star", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await start(page);
  const choo = page
    .getByRole("status")
    .filter({ hasText: "Choo choo! That's right!" });
  let solved = false;

  // The rule is never in the DOM, so try options in turn. A first miss locks
  // that option in place and leaves the rest enabled; a second miss reveals
  // the answer and brings a new train, whose options wait until it arrives.
  for (let attempt = 0; attempt < 40 && !solved; attempt++) {
    const option = openOptions(page).first();
    await expect(option).toBeEnabled({ timeout: 10_000 });
    const name = (await option.getAttribute("aria-label"))!;
    await option.click();

    // Either the miss locked that option, or the round ended and locked them all
    // (or already brought the next train).
    const picked = answerOptions(page).and(
      page.getByRole("button", { name, exact: true })
    );
    await expect
      .poll(
        async () => (await picked.count()) === 0 || (await picked.isDisabled())
      )
      .toBe(true);

    solved = (await choo.count()) > 0;
  }

  expect(solved).toBe(true);
  await expect(choo).toBeVisible();
  await expect(page.getByTestId("stars")).toHaveAttribute("data-stars", "1");
});

test("change difficulty goes back to the intro", async ({ page }) => {
  await start(page);
  await page.getByRole("button", { name: "Change difficulty" }).click();
  await expect(
    page.getByRole("radiogroup", { name: "Who's playing?" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Start playing" })
  ).toBeVisible();
  await expect(page.getByTestId("carriage")).toHaveCount(0);
});
