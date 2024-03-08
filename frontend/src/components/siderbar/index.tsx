import { FaRegAddressBook } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

export const SideBar = () => {
  return (
    <div className="menu-horizontal justify-between  w-screen  bg-base-200 sm:menu sm:h-screen sm:justify-normal sm:w-full">
      <a className="btn btn-ghost normal-case text-xl" href="/">
        Facilita Jurídico
      </a>
      <div className="divider divider-neutral"></div>
      <ul className="flex flex-row flex-wrap gap-1 sm:flex-col">
        <li className="mb-2 flex ">
          <a className="flex items-center  text-[15px] font-bold" href="/">
            <IoPersonOutline className="h-5 w-5 mr-2" />
            Cliente
          </a>
        </li>
        <li className="mb-2 flex">
          <a
            className="flex items-center text-[15px] font-bold"
            href="/endereco/formulario"
          >
            <FaRegAddressBook className="h-5 w-5 mr-2" />
            Meu endereço
          </a>
        </li>
        <li className="mb-2 flex">
          <label>Tema</label>
          <select
            data-choose-theme
            className="select select-bordered w-2/4"
            defaultValue={"capcake"}
          >
            <option value="capcake">Capcake</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </li>
      </ul>
    </div>
  );
};
