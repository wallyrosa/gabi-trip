import { rest } from "msw";

export const handler = rest.get("/info", (req, res, ctx) => {
  return res(
    ctx.json({
      message: "Hello World",
    })
  );
});
