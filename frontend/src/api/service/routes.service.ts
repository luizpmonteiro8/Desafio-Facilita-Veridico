import { MyAddress } from "../models/myAddress";
import { RouteDistance } from "../models/routeDistance";
import { Axios } from "./axios";

export const routesService = {
  calculateRoutes: async (): Promise<RouteDistance | undefined> => {
    const address: MyAddress = JSON.parse(
      localStorage.getItem("address")!
    ) as MyAddress;

    try {
      const response = await Axios.post("/routes", {
        origin: {
          street: address.street,
          number: address.number,
          district: address.district,
          city: address.city,
          state: address.state,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error routes:", error);
      throw error;
    }
  },
};
