import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../api/models/customer";
import { RouteDistance } from "../../../api/models/routeDistance";
import customerService from "../../../api/service/customer.service";
import { routesService } from "../../../api/service/routes.service";
import CustomInput from "../../../components/customInput";
import CustomModal from "../../../components/customModal";
import CustomPagination from "../../../components/customPagination";
import CustomSelect from "../../../components/customSelect";
import CustomTable from "../../../components/customTable";
import { Loading } from "../../../components/loading";
import { ModalMap } from "./modalMap";

export const CustomerList = () => {
  const navigate = useNavigate();
  //to delete
  const [customerData, setCustomerData] = useState<Customer>();

  //to route
  const [routeDistances, setRouteDistances] = useState<RouteDistance>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");
  const [field, setField] = useState("name");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [modalVisible, setModalVisible] = useState(false);

  const fetchCustomer = async (
    page: number,
    search?: string,
    sort = "id",
    order = "asc"
  ) => {
    const result = await customerService.paginationCustomer({
      page,
      search,
      field,
      size: 5,
      sort,
      order: order as "asc" | "desc",
    });

    setLastPage(result.pagination.lastPage);

    return result;
  };

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["produtos", { page, search, sort, order }],
    queryFn: () => fetchCustomer(page, search, sort, order),
  });

  const headers = [
    { display: "ID", value: "id" },
    { display: "Nome", value: "name" },
    { display: "Email", value: "email" },
    { display: "Telefone", value: "phone" },
    { display: "Endereço", value: "street" },
    { display: "Cidade", value: "city" },
    { display: "Estado", value: "state" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedData: any[][] = data
    ? data.results.map((customer) => [
        customer.id,
        customer.name,
        customer.email,
        customer.phone,
        customer.street + ", " + customer.number + " - " + customer.district,
        customer.city,
        customer.state,
      ])
    : [];

  const options = ["Nome", "Email", "Telefone", "Rua", "Cidade", "Estado"];

  const onChangeSelectField = (value: string) => {
    switch (value) {
      case "Nome":
        setField("name");
        break;
      case "Email":
        setField("email");
        break;
      case "Telefone":
        setField("phone");
        break;
      case "Rua":
        setField("street");
        break;
      case "Cidade":
        setField("city");
        break;
      case "Estado":
        setField("state");
        break;
      default:
        setField("name");
        break;
    }
    setSearch("");
  };

  const onChangeSort = (value: string) => {
    if (value === sort) {
      setOrder(order === "asc" ? "desc" : "asc");
    }
    setSort(value);
  };

  const createRoute = async () => {
    const address = localStorage.getItem("address");
    if (!address) {
      alert(
        "Endereço não encontrado. Adicione um endereço antes de criar a rota."
      );
      navigate("/endereco/formulario");
      return;
    }
    setIsModalOpen(true);
    try {
      const result = await routesService.calculateRoutes();
      setRouteDistances(result);
    } catch (error) {
      console.log(error);
      setIsModalOpen(false);
    }
  };

  const onCloseMap = () => {
    setIsModalOpen(false);
  };

  const removeCustomer = async () => {
    try {
      if (customerData && customerData.id) {
        await customerService.removeCustomer(customerData.id);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const headerPage = () => {
    return (
      <div className="flex flex-col flex-wrap p-2 sm:align-middle ">
        <div className="flex justify-between align-middle">
          <h1 className="text-2xl italic">Lista de clientes</h1>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              navigate("/cliente/formulario");
            }}
          >
            Adicionar
          </button>
        </div>
        <div className="flex flex-col w-full sm:w-1/2">
          <CustomSelect
            label="Pesquisar"
            options={options}
            onChange={onChangeSelectField}
          />

          <CustomInput
            id="search"
            name="search"
            label=""
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Pesquisar..."
          />
        </div>
      </div>
    );
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex align-middle justify-center h-screen">
        {headerPage()}
        <Loading />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col mx-auto align-middle  justify-center max-w-5xl">
        <p className="italic text-lg text-center">Nenhum cliente encontrado.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Ocorreu um erro.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-7xl mx-auto align-middle  justify-center">
      {headerPage()}
      <div className="divider"></div>
      <div className="flex justify-end">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => createRoute()}
        >
          Gerar rota
        </button>
      </div>

      <CustomTable
        headers={headers}
        data={formattedData}
        action={true}
        sort={sort}
        order={order}
        onSort={onChangeSort}
        onEdit={(rowIndex) => {
          const consumer = data.results[rowIndex];
          navigate(`/cliente/formulario/${consumer.id}`);
        }}
        onDelete={(rowIndex) => {
          setCustomerData(data.results[rowIndex]);
          setModalVisible(true);
        }}
      />

      <CustomPagination
        currentPage={page}
        totalPages={lastPage}
        onPageChange={onPageChange}
      />

      <CustomModal
        title="Excluir cliente"
        message={`Tem certeza que deseja excluir o cliente ${customerData?.name}?`}
        icon={<FaTriangleExclamation />}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={removeCustomer}
      />

      <ModalMap
        routes={routeDistances}
        isModalOpen={isModalOpen}
        onClose={onCloseMap}
      />
    </div>
  );
};
