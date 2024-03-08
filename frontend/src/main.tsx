import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "./main.css";
import { AddressForm } from "./pages/address/form";
import { CustomerForm } from "./pages/customer/form";
import { CustomerList } from "./pages/customer/list";
import { Home } from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <CustomerList /> },
      { path: "/cliente/formulario/:id?", element: <CustomerForm /> },
      { path: "/endereco/formulario/", element: <AddressForm /> },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
