import * as yup from "yup";
import "yup-phone";

export const validationSchemaAdd = yup.object().shape(
  {
    hotelPhone: yup
      .string()
      .when("hotelPhone", {
        is: (value: string) => value?.length > 0,
        then: yup.string().phone("br", true, "Telefone inválido."),
        otherwise: yup.string(),
      })
      .test({
        test: (value) => (value?.length || 0) >= 9 || value?.length === 0,
        message: "Deve conter pelo menos 11 números.",
      }),

    city: yup.string().when({
      is: (values: any) => values?.length === 0,
      then: yup.string().required("Cidade é obrigátorio."),
      otherwise: yup.string()
    }),
    country: yup.string().required("País é obrigatório."),
  },
  [["hotelPhone", "hotelPhone"]]
);
