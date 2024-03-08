import axios, { AxiosResponse } from "axios";
import { Customer } from "../models/customer";
import { Pagination, PaginationParams } from "../models/pagination";

const API_URL = import.meta.env.VITE_API_URL;

interface Results {
  results: Customer[];
  pagination: Pagination;
}

const customerService = {
  paginationCustomer: async (params?: PaginationParams): Promise<Results> => {
    try {
      const response: AxiosResponse<Results> = await axios.get(
        `${API_URL}/customer/pages`,
        {
          params: { ...params },
        }
      );
      const result = response.data;
      return { results: result.results, pagination: result.pagination };
    } catch (error) {
      console.error("Error  categories:", error);
      throw error;
    }
  },

  getCustomerById: async (id: number): Promise<Customer> => {
    try {
      const response: AxiosResponse<Customer> = await axios.get(
        `${API_URL}/customer/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error customer by ID:", error);
      throw error;
    }
  },

  createCustomer: async (customerData: Customer): Promise<Customer> => {
    try {
      const response: AxiosResponse<Customer> = await axios.post(
        `${API_URL}/customer`,
        customerData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  },

  updateCustomer: async (
    id: number,
    customerData: Customer
  ): Promise<Customer> => {
    try {
      delete customerData.id;

      const response: AxiosResponse<Customer> = await axios.patch(
        `${API_URL}/customer/${id}`,
        customerData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  },

  removeCustomer: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/customer/${id}`);
    } catch (error) {
      console.error("Error removing customer:", error);
      throw error;
    }
  },
};

export default customerService;
