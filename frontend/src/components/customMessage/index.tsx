import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

interface Props {
  type?: "success" | "error";
  message?: string;
}

const CustomMessage = ({ type, message }: Props) => {
  return (
    type &&
    message && (
      <div
        className={`${
          type === "success"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        } p-4 flex items-center justify-between my-2`}
      >
        <div className="flex items-center">
          {type === "success" ? (
            <FaCheckCircle className="mr-2 text-lg" />
          ) : (
            <FaExclamationCircle className="mr-2 text-lg" />
          )}
          <p>{message}</p>
        </div>
      </div>
    )
  );
};

export default CustomMessage;
