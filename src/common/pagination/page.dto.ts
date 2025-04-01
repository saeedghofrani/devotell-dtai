import { PaginationMeta } from "./pagination.meta";

export class PageDto<DataType> {
  constructor(
    public readonly data: DataType[],
    public readonly meta: PaginationMeta
  ) { }

  static create<DataType>(
    data: DataType[],
    count: number,
    page: number,
    limit: number
  ): PageDto<DataType> {
    const pageCount = Math.ceil(count / limit);

    return new PageDto(
      data,
      new PaginationMeta(
        page,
        limit,
        count,
        pageCount,
        page > 1,
        page < pageCount
      )
    );
  }
}