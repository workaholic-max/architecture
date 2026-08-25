export interface PaginationParams {
    page: number;
    perPage: number;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
}
