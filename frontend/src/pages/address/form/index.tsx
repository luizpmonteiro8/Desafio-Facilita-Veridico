import { useEffect, useState } from "react";
import { AddressViaCep } from "../../../api/models/address";
import { MyAddress } from "../../../api/models/myAddress";
import { getAddressViaCep } from "../../../api/service/viaCepService";
import CustomMessage from "../../../components/customMessage";
import { Form } from "./form";

export const AddressForm = () => {
  const [message, setMessage] = useState<
    | {
        type: "success" | "error";
        message: string;
      }
    | undefined
  >();
  const [address, setAddress] = useState<MyAddress>({} as MyAddress);

  useEffect(() => {
    const address = localStorage.getItem("address");
    if (address) {
      setAddress(JSON.parse(address) as MyAddress);
    }
  }, []);

  const zipCodeSearch = async (
    zip: string
  ): Promise<AddressViaCep | undefined> => {
    try {
      const response = await getAddressViaCep(zip);
      return response;
    } catch (error) {
      setMessage({
        type: "error",
        message: "Erro ao buscar o CEP!",
      });
    }
  };

  const onSubmit = async (values: MyAddress) => {
    try {
      localStorage.setItem("address", JSON.stringify(values));
      setMessage({
        type: "success",
        message: "Endereço salvo com sucesso!",
      });

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
          message: "Erro ao salvar o endereço!",
        });
      }
    }
  };
  return (
    <div className="flex flex-col mx-auto max-w-7xl">
      <h1 className="text-2xl italic ">Formulário de cadastro de endereço</h1>
      <div className="divider"></div>
      <CustomMessage type={message?.type} message={message?.message} />
      <Form
        zipCodeSearch={zipCodeSearch}
        onSubmit={onSubmit}
        address={address}
      />
    </div>
  );
};
