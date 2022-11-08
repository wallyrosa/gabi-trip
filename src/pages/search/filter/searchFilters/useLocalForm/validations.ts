import * as yup from "yup";

export const validationSchema = yup.object({
  nameOrCpf: yup.string().required("Cidade é obrigatório"),
});
