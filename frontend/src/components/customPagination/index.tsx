import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const generatePageButtons = () => {
    const buttons = [];
    const maxButtons = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));

    if (totalPages - startPage < maxButtons - 1) {
      startPage = Math.max(1, totalPages - maxButtons + 1);
    }

    for (
      let i = startPage;
      i <= Math.min(totalPages, startPage + maxButtons - 1);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1 mx-1 text-sm rounded ${
            i === currentPage
              ? "font-bold bg-success text-white"
              : "bg-gray-200 text-info "
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    totalPages > 1 && (
      <div className="flex flex-col items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 mx-1 text-sm text-info rounded bg-gray-200"
          >
            &lt;&lt;
          </button>

          <div className="flex">{generatePageButtons()}</div>

          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 mx-1 text-sm text-info rounded bg-gray-200"
          >
            &gt;&gt;
          </button>
        </div>

        <div className="mt-2 text-sm text-info">
          Página {currentPage} de {totalPages}
        </div>
      </div>
    )
  );
};

export default CustomPagination;
