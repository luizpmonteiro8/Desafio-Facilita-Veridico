import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddressViaCep } from "../../../api/models/address";
import { Customer } from "../../../api/models/customer";
import customerService from "../../../api/service/customer.service";
import { getAddressViaCep } from "../../../api/service/viaCepService";
import CustomMessage from "../../../components/customMessage";
import { Form } from "./form";

export const CustomerForm = () => {
  const params = useParams();
  const id = params.id;
  const [message, setMessage] = useState<
    | {
        type: "success" | "error";
        message: string;
      }
    | undefined
  >();
  const [consumer, setConsumer] = useState<Customer>({} as Customer);

  useEffect(() => {
    if (id) {
      customerService.getCustomerById(Number(id)).then((customer) => {
        setConsumer(customer);
      });
    }
  }, []);

  const zipCodeSearch = async (
    zip: string
  ): Promise<AddressViaCep | undefined> => {
    try {
      const response = await getAddressViaCep(zip);
      return response;
    } catch (error) {
      /*  handleAxiosError(error, "Erro ao buscar o CEP"); */
    }
  };

  const onSubmit = async (
    values: Customer,
    formikHelpers: { resetForm: () => void }
  ) => {
    try {
      if (values.id) {
        await customerService.updateCustomer(values.id, values);
      } else {
        await customerService.createCustomer(values);
      }
      setMessage({
        type: "success",
        message: "Cliente salvo com sucesso!",
      });
      formikHelpers.resetForm();
      setConsumer({} as Customer);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.message) {
        setMessage({
          type: "error",
          message: error.response.data.message,
        });
      } else {
        setMessage({
          type: "error",
          message: "Erro ao salvar o cliente!",
        });
      }
    }
  };
  return (
    <div className="flex flex-col mx-auto max-w-7xl">
      <h1 className="text-2xl italic ">Formulário de cadastro de cliente</h1>
      <div className="divider"></div>
      <CustomMessage type={message?.type} message={message?.message} />
      <Form
        zipCodeSearch={zipCodeSearch}
        onSubmit={onSubmit}
        consumer={consumer}
      />
    </div>
  );
};
