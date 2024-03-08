import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("O e-mail deve ser válido")
    .required("O e-mail é obrigatório"),
  phone: yup.string().required("O telefone é obrigatório"),
  street: yup.string().required("A rua é obrigatória"),
  zipCode: yup.string().required("O CEP é obrigatório"),
  number: yup.string().required("O número é obrigatório"),
  complement: yup.string(),
  district: yup.string().required("O bairro é obrigatório"),
  city: yup.string().required("A cidade é obrigatória"),
  state: yup.string().required("O estado é obrigatório"),
});
