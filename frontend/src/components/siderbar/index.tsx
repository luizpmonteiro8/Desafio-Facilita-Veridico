import { FaRegAddressBook } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="menu-horizontal justify-between  w-screen  bg-base-200 sm:menu sm:h-screen sm:justify-normal sm:w-full">
      <a className="btn btn-ghost normal-case text-xl" href="/">
        Facilita Jurídico
      </a>
      <div className="divider divider-neutral"></div>
      <ul className="flex flex-row flex-wrap gap-1 sm:flex-col">
        <li className="mb-2 flex ">
          <NavLink
            className="flex items-center  text-[15px] font-bold"
            to="/"
            replace={true}
          >
            <IoPersonOutline className="h-5 w-5 mr-2" />
            Cliente
          </NavLink>
        </li>
        <li className="mb-2 flex">
          <NavLink
            className="flex items-center  text-[15px] font-bold"
            to="/endereco/formulario"
            replace={true}
          >
            <FaRegAddressBook className="h-5 w-5 mr-2" />
            Meu endereço
          </NavLink>
        </li>
        <li className="mb-2 flex sm:w-full">
          <label>Tema</label>
          <select
            data-choose-theme
            className="select select-bordered w-full sm:w-2/4 "
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
