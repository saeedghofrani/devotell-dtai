import { Inject, Injectable } from '@nestjs/common';
import { DatabaseProviderConstant } from './../../../database/constant/database-provider.constant';
import { LocationEntity } from './../../../database/entities/location.entity';
import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';
import { CreateLocationDto } from '../dto/create.dto';

@Injectable()
export class LocationRepository extends Repository<LocationEntity> {
  constructor(
    @Inject(DatabaseProviderConstant) private postgresDataSource: DataSource,
  ) {
    super(LocationEntity, postgresDataSource.createEntityManager());
  }

  public async upsertLocation(
    createLocation: CreateLocationDto,
    entityManager?: EntityManager,
  ): Promise<InsertResult> {
    const repository = entityManager?.getRepository(LocationEntity) || this;
    return await repository.upsert(
      {
        city: createLocation.city,
        country: createLocation.country,
        state: createLocation.state,
      },
      {
        conflictPaths: { city: true, country: true, state: true },
      },
    );
  }

  public async findByIdLocation(
    id: number,
    entityManager?: EntityManager,
  ): Promise<LocationEntity> {
    const repository = entityManager?.getRepository(LocationEntity) || this;
    return await repository.findOneBy({ id });
  }
}
