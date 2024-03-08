import { useFormik } from "formik";
import { useRef } from "react";
import { MdOutlineContactMail } from "react-icons/md";
import { AddressViaCep } from "../../../api/models/address";
import { MyAddress } from "../../../api/models/myAddress";
import CustomInput from "../../../components/customInput";
import { cepMask } from "../../../components/util/cepMask";
import { schema } from "./validation";

interface Props {
  zipCodeSearch: (zip: string) => Promise<AddressViaCep | undefined>;
  address?: MyAddress;
  onSubmit: (
    values: MyAddress,
    formikHelpers: { resetForm: () => void }
  ) => void;
}

const initialValues: MyAddress = {
  zipCode: "",
  street: "",
  number: "",
  complement: "",
  district: "",
  city: "",
  state: "",
};

export const Form = ({ zipCodeSearch, address, onSubmit }: Props) => {
  const numberRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: { ...initialValues, ...address },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit,
  });

  const checkZipCode = async (zip: string) => {
    const address = await zipCodeSearch(zip);
    if (address) {
      formik.setFieldValue("street", address.logradouro);
      formik.setFieldValue("district", address.bairro);
      formik.setFieldValue("city", address.localidade);
      formik.setFieldValue("state", address.uf);
      if (numberRef.current) numberRef.current?.focus();
    }
  };

  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <form className="flex flex-col" onSubmit={formik.handleSubmit}>
      <CustomInput
        id="zipCode"
        name="zipCode"
        label="Cep"
        icon={<MdOutlineContactMail />}
        placeholder="Digite o cep"
        value={cepMask(formik.values.zipCode)}
        onBlur={formik.handleBlur}
        onChange={async (e) => {
          formik.handleChange(e);
          if (e.target.value.length == 9) {
            await checkZipCode(e.target.value);
          }
        }}
        error={formik.touched.zipCode ? formik.errors.zipCode : undefined}
      />

      <CustomInput
        id="street"
        name="street"
        label="Rua"
        icon={<MdOutlineContactMail />}
        placeholder="Digite a rua"
        value={formik.values.street}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.street ? formik.errors.street : undefined}
      />

      <CustomInput
        id="number"
        name="number"
        label="Número"
        icon={<MdOutlineContactMail />}
        customRef={numberRef}
        placeholder="Digite o número"
        value={formik.values.number}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.number ? formik.errors.number : undefined}
      />

      <CustomInput
        id="complement"
        name="complement"
        label="Complemento"
        icon={<MdOutlineContactMail />}
        placeholder="Digite o complemento"
        value={formik.values.complement || ""}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.complement ? formik.errors.complement : undefined}
      />

      <CustomInput
        id="district"
        name="district"
        label="Bairro"
        icon={<MdOutlineContactMail />}
        placeholder="Digite o bairro"
        value={formik.values.district}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.district ? formik.errors.district : undefined}
      />

      <CustomInput
        id="city"
        name="city"
        label="Cidade"
        icon={<MdOutlineContactMail />}
        placeholder="Digite a cidade"
        value={formik.values.city}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.city ? formik.errors.city : undefined}
      />

      <CustomInput
        id="state"
        name="state"
        label="Estado"
        icon={<MdOutlineContactMail />}
        placeholder="Digite o estado"
        value={formik.values.state}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.state ? formik.errors.state : undefined}
      />

      <div className="flex justify-end">
        <button
          className="btn btn-secondary  mr-2"
          type="button"
          onClick={() => handleReset()}
        >
          Limpar
        </button>
        <button className="btn btn-primary " type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
};
