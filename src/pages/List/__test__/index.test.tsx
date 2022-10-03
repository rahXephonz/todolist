import { renderWithClient } from "config/Handlers";
import { server } from "config/tests/setupTests";
import { Home } from "../index.page";
import { rest } from "msw";

test("if user is fetch, data will be show", async () => {
  const result = renderWithClient(<Home />);

  expect(await result.findByText(/Leanne Graham/i)).toBeInTheDocument();
});

test("if todos is fetch, data will be show", async () => {
  const result = renderWithClient(<Home />);

  expect(await result.findByText(/Do Something/i)).toBeInTheDocument();
});

test("if the user fetch fails, show the error message", async () => {
  server.use(
    rest.get("*", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  const result = renderWithClient(<Home />);

  expect(
    await result.findByText(/Error fetching your data../i),
  ).toBeInTheDocument();
});
