import { expect, test } from "@playwright/test";

test("picking the landing number shows feedback and scores", async ({
  page,
}) => {
  await page.goto("/frog-jump");
  const problem = page.getByTestId("jump-problem");
  await expect(problem).toHaveText(/Start at \d+, jump [+-] \d+\./);

  const [, start, op, jump] = (await problem.textContent())!.match(
    /Start at (\d+), jump ([+-]) (\d+)/
  )!;
  const answer = op === "+" ? +start + +jump : +start - +jump;

  const option = page.getByRole("button", {
    name: String(answer),
    exact: true,
  });
  await expect(option).toBeEnabled();
  await option.click();
  await expect(page.getByRole("status")).toHaveText("🎉 Excellent!");
  await expect(page.getByTestId("score")).toHaveText("10");
});
