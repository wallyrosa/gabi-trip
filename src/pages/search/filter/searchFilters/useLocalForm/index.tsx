import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { useForm } from "react-hook-form";
import { DtoValidationError } from "../../../../../services/api/types/dtoValidationError";
import { getErrorsFromServiceValidationError } from "../helpers";
import { LocalFormValues } from "./types";
import { validationSchema } from "./validations";

export function useLocalForm() {
  const form = useForm<LocalFormValues>({
    defaultValues: {
      city: "",
      country: ""
    },
    resolver: yupResolver(validationSchema),
  });

  const { clearErrors, setError } = form;

  const setValidationsErrors = React.useCallback(
    (valErrors: DtoValidationError[]) => {
      clearErrors();
      const formErrors = getErrorsFromServiceValidationError(valErrors);
      formErrors.forEach((err) => {
        setError(err.path as any, { message: err.message });
      });
    },
    [clearErrors, setError]
  );

  return {
    ...form,
    setValidationsErrors,
  };
}
