export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  field?: string;
}

export interface Pagination {
  lastPage: number;
  length: number;
  page: number;
  size: number;
}
