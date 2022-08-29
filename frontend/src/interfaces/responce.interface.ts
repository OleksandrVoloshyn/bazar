export interface IResponse<T> {
    next: boolean,
    prev: boolean,
    data: T[],
    total_items: number,
    total_pages: number
}