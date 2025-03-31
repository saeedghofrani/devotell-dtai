import { Module } from '@nestjs/common';
import { CompanyRepository } from './repository/company.repository';
import { CompanyService } from './service/company.service';

@Module({
  imports: [],
  providers: [CompanyRepository, CompanyService],
  exports: [CompanyRepository, CompanyService],
})
export class CompanyModule {}
