export interface RouteDistanceParams {
  customerId: number;
  customerName: string;
  customerStreet: string;
  customerNumber: string;
  customerComplement: string;
  customerDistrict: string;
  customerCity: string;
  customerState: string;
  lat: string;
  long: string;
  distance: number;
}

export interface RouteDistance {
  resultOrigin: { lat: string; long: string };
  destinationsCustomerLatLong: RouteDistanceParams[];
}
