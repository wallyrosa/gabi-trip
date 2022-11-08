import { rest } from "msw";
import { dataSource } from "./dataSource";

export const getAllLocations = rest.get("/api/v1/location", (req, res, ctx) => {
  return res(ctx.json(dataSource), ctx.status(200));
});
