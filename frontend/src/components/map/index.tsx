import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { RouteDistance } from "../../api/models/routeDistance";

interface Props {
  routeDistances: RouteDistance;
}

const MapWithMarkers = ({ routeDistances }: Props) => {
  const initialPosition = [
    routeDistances.resultOrigin.lat,
    routeDistances.resultOrigin.long,
  ];

  const destinationPositions: LatLngTuple[] =
    routeDistances.destinationsCustomerLatLong.map((route) => [
      parseFloat(route.lat),
      parseFloat(route.long),
    ]);

  return (
    <MapContainer
      center={[Number(initialPosition[0]), Number(initialPosition[1])]}
      zoom={13}
      scrollWheelZoom={true}
      boundsOptions={{ padding: [10, 10] }}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Polyline
        positions={[
          [Number(initialPosition[0]), Number(initialPosition[1])],
          ...destinationPositions,
        ]}
      />
      <Circle
        radius={300}
        center={[Number(initialPosition[0]), Number(initialPosition[1])]}
      >
        <Tooltip>
          <div>
            <p>Origem</p>
          </div>
        </Tooltip>
      </Circle>

      {routeDistances.destinationsCustomerLatLong.map((route, index) => {
        return (
          <Marker
            key={index}
            position={[Number(route.lat), Number(route.long)]}
          >
            <Tooltip>
              <div>
                <p>{`${index + 1}. ${route.customerName}`}</p>
                <p>{`${route.customerStreet}, ${route.customerNumber}`}</p>
                <p>{`${route.customerComplement}, ${route.customerDistrict}`}</p>
                <p>{`${route.customerCity}, ${route.customerState}`}</p>
                <p>{`Distância: ${route.distance} km`}</p>
                <p>{`Latitude: ${route.lat}`}</p>
                <p>{`Longitude: ${route.long}`}</p>
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapWithMarkers;
