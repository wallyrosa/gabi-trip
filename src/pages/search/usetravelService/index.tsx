import * as React from "react";
import { DtoTripLocation } from "../../../services/api/v1/location/dto";
import { LocationService } from "../../../services/api/v1/location";
import { LocalFormValues } from "../filter/searchFilters/useLocalForm/types";

export interface UseTravelServiceProps {
  locationId: number;
}

export function useTravelService(props?: UseTravelServiceProps) {
  const [locations, setLocations] = React.useState<DtoTripLocation[]>();
  const [loading, setLoading] = React.useState(false);

  const search = React.useCallback(async (values: LocalFormValues) => {
    try {
      setLoading(true);
      const response = await LocationService.getLocations({
        city: values.city,
        country: values?.country,
      });

      setLocations(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (props?.locationId) search({ city: "", country: "" });
  }, [props?.locationId, search]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      search({ city: "", country: "" });
      setLoading(false);
    })();
  }, [search, props?.locationId]);
  return {
    loading,
    locations,
    search,
  };
}
