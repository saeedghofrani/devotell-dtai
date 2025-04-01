export class PaginationMeta {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly itemCount: number,
    public readonly pageCount: number,
    public readonly hasPreviousPage: boolean,
    public readonly hasNextPage: boolean
  ) { }
}