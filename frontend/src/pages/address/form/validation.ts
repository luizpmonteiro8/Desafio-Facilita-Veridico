import * as yup from "yup";

export const schema = yup.object({
  street: yup.string().required("A rua é obrigatória"),
  zipCode: yup.string().required("O CEP é obrigatório"),
  number: yup.string().required("O número é obrigatório"),
  complement: yup.string(),
  district: yup.string().required("O bairro é obrigatório"),
  city: yup.string().required("A cidade é obrigatória"),
  state: yup.string().required("O estado é obrigatório"),
});
