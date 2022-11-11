import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { useForm } from "react-hook-form";
import { DtoValidationError } from "../../../../services/api/types/dtoValidationError";
import { getErrorsFromServiceValidationError } from "../../filter/searchFilters/helpers";
import { LocalFormValuesTripLocation } from "../../filter/searchFilters/useLocalForm/types";
import { validationSchemaAdd } from "./validations";

export function useLocalFormAdd() {
  const formAdd = useForm<LocalFormValuesTripLocation>({
    defaultValues: {
      city: "",
      country: "",
      hotelPhone: "",
      hotelName: "",
      travelPlan: "",
    },
    resolver: yupResolver(validationSchemaAdd),
  });

  const { clearErrors, setError } = formAdd;

  const setValidationsErrors = React.useCallback(
    (valErrors: DtoValidationError[]) => {
      console.log("valErrors: ", valErrors);
      clearErrors();
      const formErrors = getErrorsFromServiceValidationError(valErrors);
      formErrors.forEach((err) => {
        setError(err.path as any, { message: err.message });
      });
    },
    [clearErrors, setError]
  );

  return {
    ...formAdd,
    setValidationsErrors,
  };
}
