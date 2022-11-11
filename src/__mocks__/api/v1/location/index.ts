import { rest } from "msw";
import { DtoTripLocation } from "../../../../services/api/v1/location/dto";
import { dataSource } from "./dataSource";
import { createTripSchema } from "./param";

export const getAllLocations = rest.get("/api/v1/location", (req, res, ctx) => {
  const city = req.url.searchParams.get("city");
  const country = req.url.searchParams.get("country");
  if (city || country) {
    const result = dataSource.filter((i) => {
      const containCity = i.city.indexOf(city || "") > -1;
      const containCountry = i.country.indexOf(country || "") > -1;

      return containCity && containCountry;
    });

    return res(ctx.json(result), ctx.status(200));
  }

  return res(ctx.json(dataSource), ctx.status(200));
});

export const getLocation = rest.get(
  "/api/v1/location/:locationId",
  (req, res, ctx) => {
    const locationId: any = req.params["locationId"];

    if (locationId) {
      const location = dataSource.find((i) => i.id! === parseInt(locationId));
      if (location) {
        return res(ctx.json(location), ctx.status(200));
      }
    }

    return res(ctx.status(404));
  }
);

export const deleteLocationService = rest.delete(
  "/api/v1/location/:locationId",
  (req, res, ctx) => {
    const locationId = parseInt(String(req.params["locationId"]));

    if (locationId) {
      try {
        const removeItem = dataSource.findIndex(
          (item) => item.id! === locationId
        );

        dataSource.splice(removeItem, 1);

        return res(ctx.status(204));
      } catch (error: any) {
        console.log(error.inner);
        return res(ctx.status(422));
      }
    }
    return res(ctx.status(404));
  }
);

export const putLocation = rest.put(
  "/api/v1/location/:locationId",
  (req, res, ctx) => {
    const locationId: any = req.params["locationId"];
    const body = req.body as Partial<DtoTripLocation>;

    try {
      createTripSchema.validateSync(body, { abortEarly: false });
      const locationIndex = dataSource.findIndex(
        (i) => i.id! === parseInt(locationId)
      );
      if (locationIndex > -1) {
        const updateLocation = { ...dataSource[locationIndex], ...body };
        dataSource[locationIndex] = updateLocation;
      }
      return res(ctx.json(body), ctx.status(200));
    } catch (error: any) {
      return res(ctx.json(error.inner), ctx.status(422));
    }
  }
);

export const postLocation = rest.post("/api/v1/location", (req, res, ctx) => {
  const body = req.body as Partial<DtoTripLocation>;

  try {
    createTripSchema.validateSync(body, { abortEarly: false });
    body.id = dataSource.length + 1;
    // let bodyContain = false
    // const contain = dataSource.findIndex((obj) => {
    //   if (obj.city === body.city && obj.country === body.country){
    //     bodyContain = true
    //     return bodyContain
    //   }
    //   return bodyContain;
    // });
    // if(contain > -1){
    //   return res(ctx.status(422), ctx.json("Já existe!"));
    // }
    dataSource.push(body as any);
    return res(ctx.json(body), ctx.status(200));

  } catch (error: any) {

    return res(ctx.status(422), ctx.json(error.inner));
  }
});
