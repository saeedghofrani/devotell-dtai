import { SelectQueryBuilder } from 'typeorm';
import { PageDto } from './page.dto';

export async function createPagination<Entity>(
  queryBuilder: SelectQueryBuilder<Entity>,
  page = 1,
  limit = 10,
): Promise<PageDto<Entity>> {
  const skip = (page - 1) * limit;

  const [data, total] = await queryBuilder
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  const pageCount = Math.ceil(total / limit);

  return {
    data,
    meta: {
      page,
      limit,
      itemCount: total,
      pageCount,
      hasPreviousPage: page > 1,
      hasNextPage: page < pageCount,
    },
  };
}
