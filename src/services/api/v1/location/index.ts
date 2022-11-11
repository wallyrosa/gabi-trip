import { locationAxios } from "../../locationAxios";
import { DtoTripLocation } from "./dto";
import { LocationsParams } from "./params";
import Axios from "axios";

export class LocationService {
  static async getLocations(params: Partial<LocationsParams>) {
    const url = "/api/v1/location";
    const response = await Axios.get<DtoTripLocation[]>(url, {
      params,
    });
    return response.data;
  }
  static async getLocation(locationId: number) {
    const url = `/api/v1/location/${locationId}`;
    const response = await Axios.get<DtoTripLocation>(url);
    return response.data;
  }

  static async deleteLocation(locationId: number | undefined) {
    const url = `/api/v1/location/${locationId}`;
    const response = await Axios.delete<DtoTripLocation>(url);
    return response.data;
  }

  static async postLocation(dto: Partial<DtoTripLocation>) {
    const url = `/api/v1/location`;
    const response = await Axios.post<DtoTripLocation>(url, dto);
    return response.data;
  }

  static async putLocation(locationId: number, dto: Partial<DtoTripLocation>) {
    const url = `/api/v1/location/${locationId}`;
    const response = await Axios.put<DtoTripLocation>(url, dto);
    return response.data;
  }
}
