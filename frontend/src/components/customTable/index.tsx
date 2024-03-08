/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface CustomTableProps {
  headers: { display: string; value: string }[];
  data: any[][];
  isLoading?: boolean;
  action?: boolean;
  sort: string;
  order: "asc" | "desc";
  onSort: (sort: string) => void;
  onEdit?: (rowIndex: number) => void;
  onDelete?: (rowIndex: number) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  headers,
  data,
  action,
  sort,
  order,
  onSort,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto mb-2">
      <table className="table table-xs table-pin-rows table-zebra">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="cursor-pointer"
                onClick={() => onSort(header.value)}
              >
                <div className="flex items-center">
                  <p
                    className={
                      sort === header.value ? "text-primary" : "text-gray-500"
                    }
                  >
                    {header.display}
                  </p>
                  {header.display !== "" && (
                    <span className="ml-1 text-gray-500">
                      <IoChevronUp
                        className={
                          order === "asc" && sort === header.value
                            ? "text-primary"
                            : "text-gray-500"
                        }
                      />
                      <IoChevronDown
                        className={
                          order === "desc" && sort === header.value
                            ? "text-primary"
                            : "text-gray-500"
                        }
                      />
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {item.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}

              {action && (
                <td>
                  <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() => onEdit?.(rowIndex)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-error m-2"
                    onClick={() => onDelete?.(rowIndex)}
                  >
                    Apagar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <p className="text-gray-500">Nenhum item encontrado</p>
      )}
    </div>
  );
};

export default CustomTable;
