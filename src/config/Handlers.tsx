import { render } from "@testing-library/react";
import { rest } from "msw";
import { QueryClientProvider } from "react-query";
import React from "react";
import queryClient from "libs/queryClient";

export const handlers = [
  rest.get("*/users/*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "Leanne Graham",
      }),
    );
  }),

  rest.get("*/todos/*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        title: "Do something",
      }),
    );
  }),
];

export const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = queryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>,
      ),
  };
};

export const createWrapper = () => {
  const testQueryClient = queryClient();
  return ({ children }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
