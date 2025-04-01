import { MigrationInterface, QueryRunner } from 'typeorm';

export class CompanyWebsite1743395120398 implements MigrationInterface {
  name = 'CompanyWebsite1743395120398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies" DROP CONSTRAINT "UQ_3e7b86aa8b4ffe84947ff29c0b3"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "UQ_3e7b86aa8b4ffe84947ff29c0b3" UNIQUE ("website")`,
    );
  }
}
