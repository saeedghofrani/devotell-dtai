import { Inject, Injectable } from '@nestjs/common';
import { DatabaseProviderConstant } from './../../../database/constant/database-provider.constant';
import { CompanyEntity } from './../../../database/entities/company.entity';
import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';
import { CreateCompanyDto } from '../dto/create.dto';

@Injectable()
export class CompanyRepository extends Repository<CompanyEntity> {
  constructor(
    @Inject(DatabaseProviderConstant) private postgresDataSource: DataSource,
  ) {
    super(CompanyEntity, postgresDataSource.createEntityManager());
  }

  public async upsertCompany(
    createCompany: CreateCompanyDto,
    entityManager?: EntityManager,
  ): Promise<InsertResult> {
    const repository = entityManager?.getRepository(CompanyEntity) || this;
    return await repository.upsert(
      {
        name: createCompany.name,
        industry: createCompany.industry,
        website: createCompany.website,
      },
      {
        conflictPaths: { name: true },
      },
    );
  }

  public async findByIdCompany(
    id: number,
    entityManager?: EntityManager,
  ): Promise<CompanyEntity> {
    const repository = entityManager?.getRepository(CompanyEntity) || this;
    return await repository.findOneBy({ id });
  }
}
