import * as yup from 'yup'

export const createTripSchema = yup.object({
  city: yup.string().required(),
  country: yup.string().required(),
});