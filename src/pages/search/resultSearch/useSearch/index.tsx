import { LocationService } from "../../../../services/api/v1/location/index";
import { DtoTripLocation } from "../../../../services/api/v1/location/dto";
import * as React from "react";
import { DtoValidationError } from "../../../../services/api/types/dtoValidationError";
import { getDtoTripFromFormValues } from "../../filter/searchFilters/helpers";
import { AxiosError } from "axios";

interface useLocationServiceProps {
  locationId?: number;
}

export function useLocationService(props: useLocationServiceProps) {
  const [location, setLocation] = React.useState<DtoTripLocation>();
  const [loading, setLoading] = React.useState(false);

  const load = React.useCallback(async (locationId: number) => {
    try {
      setLoading(false);
      const result = await LocationService.getLocation(locationId);
      setLocation(result);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const save = React.useCallback(
    async (
      values: DtoTripLocation,
      onSuccess: () => void,
      onValidationError: (onValidationErrors: DtoValidationError[]) => void
    ) => {
      const dto = getDtoTripFromFormValues(props.locationId, values);

      try {
        setLoading(true);
        if (!props.locationId) {
          await LocationService.postLocation(dto);
        } else {
          LocationService.putLocation(props.locationId, dto);
        }
        onSuccess();
      } catch (error: any) {
        const axiosError = error as AxiosError | any;
        if (axiosError.response?.status === 422) {
          onValidationError(axiosError.response.data);
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [props.locationId]
  );

  const deleteLocation = React.useCallback(
    async (locationId: number | undefined) => {
      await LocationService.deleteLocation(locationId);
    },
    []
  );

  React.useEffect(() => {
    if (props.locationId) load(props.locationId);
  }, [props.locationId, load]);

  return { location, loading, save, deleteLocation };
}
