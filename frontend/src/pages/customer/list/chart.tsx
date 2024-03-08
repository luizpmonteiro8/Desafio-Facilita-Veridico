import {
  CartesianGrid,
  Legend,
  Line,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RouteDistanceParams } from "../../../api/models/routeDistance";

interface Props {
  destinationsCustomerLatLong: RouteDistanceParams[];
  origin: { lat: string; long: string };
}

const ScatterPlot = ({ destinationsCustomerLatLong, origin }: Props) => {
  const dataWithOrigin = [
    {
      x: Number(origin.lat),
      y: Number(origin.long),
      name: "Origem",
      distance: 0,
    },
    ...destinationsCustomerLatLong.map((point) => ({
      x: Number(point.lat),
      y: Number(point.long),
      name: point.customerName,
      distance: point.distance,
    })),
  ];

  // Ordenar os pontos por distância
  const sortedData = dataWithOrigin
    .slice()
    .sort((a, b) => a.distance - b.distance);

  return (
    <ScatterChart width={400} height={400}>
      <CartesianGrid />
      <XAxis type="number" dataKey="y" name="Longitude" />
      <YAxis type="number" dataKey="x" name="Latitude" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Legend />
      <Scatter name="Destinos" data={sortedData} fill="#8884d8" />
      <Line type="monotone" dataKey="y" stroke="#82ca9d" />
    </ScatterChart>
  );
};

export default ScatterPlot;
