import { expect, test } from "@playwright/test";

const games = [
  { name: "Jogo da Memória", path: "/pt/memory-game" },
  { name: "Conte os Animais", path: "/pt/count-the-animals" },
  { name: "Pulo do Sapo", path: "/pt/frog-jump" },
  { name: "Estoure as Bolhas", path: "/pt/bubble-pop" },
  { name: "Qual É o Diferente?", path: "/pt/odd-one-out" },
  { name: "Sons das Letras", path: "/pt/letter-sounds" },
  { name: "Separe as Formas", path: "/pt/shape-sorter" },
  { name: "Trem dos Padrões", path: "/pt/pattern-train" },
];

test("the Portuguese home lists every game in Portuguese", async ({
  page,
}) => {
  await page.goto("/pt");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page).toHaveTitle("Zololo Games");
  await expect(
    page.getByRole("heading", { name: "Toque em um jogo para jogar." })
  ).toBeVisible();

  const main = page.getByRole("main");
  for (const game of games) {
    await expect(
      main.getByRole("link", { name: new RegExp(game.name.replace("?", "\\?")) })
    ).toHaveAttribute("href", game.path);
  }
});

test("each Portuguese game page has a Portuguese title and intro", async ({
  page,
}) => {
  for (const game of games) {
    await page.goto(game.path);
    await expect(page).toHaveTitle(`${game.name} · Zololo Games`);
    await expect(
      page.getByRole("heading", { name: game.name, level: 1 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Como jogar" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Começar a jogar" })
    ).toBeVisible();
  }
});

test("the language switcher keeps you on the same game", async ({ page }) => {
  await page.goto("/frog-jump");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  const languages = page.getByRole("group", { name: "Language" });
  await expect(
    languages.getByRole("link", { name: "English" })
  ).toHaveAttribute("aria-current", "true");

  await languages.getByRole("link", { name: "Português" }).click();
  await expect(page).toHaveURL("/pt/frog-jump");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(
    page.getByRole("heading", { name: "Pulo do Sapo", level: 1 })
  ).toBeVisible();

  await page
    .getByRole("group", { name: "Idioma" })
    .getByRole("link", { name: "English" })
    .click();
  await expect(page).toHaveURL("/frog-jump");
});

test("a Portuguese game plays in Portuguese", async ({ page }) => {
  await page.goto("/pt/frog-jump");
  await page.getByRole("button", { name: "Começar a jogar" }).click();

  const PROBLEM = /^Comece no (\d+), pule \+ (\d+)\.$/;
  const problem = page.getByTestId("jump-problem");
  await expect(problem).toHaveText(PROBLEM);
  const [, start, jump] = (await problem.textContent())!.match(PROBLEM)!;
  await expect(page.getByTestId("difficulty")).toHaveText("Fácil · 4–5 anos");

  await page
    .getByRole("button", { name: String(+start + +jump), exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText("🎉 Muito bem!");
  await expect(page.getByTestId("stars")).toHaveAttribute(
    "aria-label",
    "1 de 5 estrelas"
  );
});

test("English pages are not duplicated under /en", async ({ page }) => {
  await page.goto("/en/frog-jump");
  await expect(page).toHaveURL("/frog-jump");
});
