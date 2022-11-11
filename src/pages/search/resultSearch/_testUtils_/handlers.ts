import { handler } from "../../../../__mocks__/api/info";
import {
  deleteLocationService,
  getAllLocations,
  getLocation,
  putLocation,
  postLocation,
} from "../../../../__mocks__/api/v1/location/index";

export const handlers = [
  handler,
  getAllLocations,
  getLocation,
  deleteLocationService,
  putLocation,
  postLocation,
];
