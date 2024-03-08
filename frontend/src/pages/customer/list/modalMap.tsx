import { useEffect, useState } from "react";
import { RouteDistance } from "../../../api/models/routeDistance";
import { Loading } from "../../../components/loading";
import MapWithMarkers from "../../../components/map";
import ScatterPlot from "./chart";

interface Props {
  routes?: RouteDistance;
  isModalOpen: boolean;
  onClose: () => void;
}

export const ModalMap = ({ routes, isModalOpen, onClose }: Props) => {
  const [routesChange, setRoutesChange] = useState<RouteDistance>();

  useEffect(() => {
    setRoutesChange(routes);
  }, [routes]);

  const handleDelete = async (index: number) => {
    if (routesChange) {
      const newDestinationsCustomerLatLong =
        routesChange.destinationsCustomerLatLong.filter((_, i) => i !== index);
      setRoutesChange({
        ...routesChange,
        destinationsCustomerLatLong: newDestinationsCustomerLatLong,
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto z-40 ${
        isModalOpen ? "" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 opacity-75"
          onClick={onClose}
        ></div>
        <div
          className="inline-block align-bottom bg-white rounded-lg 
        text-left overflow-hidden shadow-xl transform transition-all 
        sm:my-8 sm:align-middle sm:w-full sm:max-w-lg"
        >
          <button
            className="absolute top-0 right-0 m-4 text-gray-600 cursor-pointer z-50"
            onClick={onClose}
          >
            X
          </button>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {routesChange ? (
              <>
                <MapWithMarkers routeDistances={routesChange} />
                <ScatterPlot
                  origin={routesChange.resultOrigin}
                  destinationsCustomerLatLong={
                    routesChange.destinationsCustomerLatLong
                  }
                />
                {routesChange.destinationsCustomerLatLong.map(
                  (route, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 px-4 py-3 flex flex-wrap items-center"
                    >
                      <p className="text-lg text-accent ">{`${index + 1}. ${
                        route.customerName
                      }`}</p>
                      <button
                        className="btn btn-error btn-sm ml-2"
                        onClick={() => handleDelete(index)}
                      >
                        Excluir
                      </button>
                    </div>
                  )
                )}
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
