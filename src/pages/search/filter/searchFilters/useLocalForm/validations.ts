import * as yup from "yup";

export const validationSchema = yup.object({
  city: yup.string().when({
    is: (values: any) => values?.length > 0,
    then: yup.string().min(3, "Deve conter no mínimo 3 caracteres."),
    otherwise: yup.string(),
  }),
  country: yup.string().when({
    is: (values: any) => values?.length > 0,
    then: yup.string().min(3, "Deve conter no mínimo 3 caracteres."),
    otherwise: yup.string(),
  }),
});

