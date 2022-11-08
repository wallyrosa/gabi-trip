import { DtoValidationError } from "../../../../services/api/types/dtoValidationError";
import { DtoTripLocation } from "../../../../services/api/v1/location/dto";
import { LocalFormValuesTripLocation } from "./useLocalForm/types";

export function getFormValuesFromDtoTrip(dto: DtoTripLocation) {
  const result: DtoTripLocation = {
    id: dto.id,
    city: dto.city,
    country: dto.country,
    nameHotel: dto.nameHotel,
    PhoneHotel: dto.PhoneHotel,
    touristSpots: dto.touristSpots,
  };

  return result;
}

export function getDtoTripFromFormValues(
  contactId: number | undefined,
  values: LocalFormValuesTripLocation
) {
  let dto: Partial<DtoTripLocation> = {
    ...(contactId && { id: contactId }),
    city: values.city,
    country: values.country,
    nameHotel: values.nameHotel,
    PhoneHotel: values.PhoneHotel,
    touristSpots: values.touristSpots,
  };

  return dto;
}

export function getErrorsFromServiceValidationError(
  validationErrors: DtoValidationError[]
) {
  const errors = validationErrors.map((error) => ({
    path: error.path,
    message: error.errors.join(", "),
  }));

  return errors;
}
