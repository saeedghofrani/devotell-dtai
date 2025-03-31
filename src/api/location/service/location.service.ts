import { Injectable } from '@nestjs/common';
import { EntityManager, InsertResult } from 'typeorm';
import { CreateLocationDto } from '../dto/create.dto';
import { LocationRepository } from '../repository/location.repository';
import { LocationEntity } from 'src/database/entities/location.entity';

@Injectable()
export class LocationService {
  public constructor(private readonly locationRepository: LocationRepository) {}

  public async upsertLocation(
    createLocation: CreateLocationDto,
    entityManager?: EntityManager,
  ): Promise<InsertResult> {
    return await this.locationRepository.upsertLocation(
      createLocation,
      entityManager,
    );
  }

  public async findByIdLocation(
    id: number,
    entityManager?: EntityManager,
  ): Promise<LocationEntity> {
    return await this.locationRepository.findByIdLocation(id, entityManager);
  }
}
