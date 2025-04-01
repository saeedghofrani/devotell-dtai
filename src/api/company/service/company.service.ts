import { Injectable } from '@nestjs/common';
import { EntityManager, InsertResult } from 'typeorm';
import { CreateCompanyDto } from '../dto/create.dto';
import { CompanyRepository } from '../repository/company.repository';
import { CompanyEntity } from './../../../database/entities/company.entity';

@Injectable()
export class CompanyService {
  public constructor(private readonly companyRepository: CompanyRepository) {}

  public async upsertCompany(
    createCompany: CreateCompanyDto,
    entityManager?: EntityManager,
  ): Promise<InsertResult> {
    return await this.companyRepository.upsertCompany(
      createCompany,
      entityManager,
    );
  }

  public async findByIdCompany(
    id: number,
    entityManager?: EntityManager,
  ): Promise<CompanyEntity> {
    return await this.companyRepository.findByIdCompany(id, entityManager);
  }
}
