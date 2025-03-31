import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version21743393492669 implements MigrationInterface {
  name = 'Version21743393492669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_8690b1c368a2ec7294969b260af"`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "companiesId"`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "remote" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" ADD "companyId" integer`);
    await queryRunner.query(
      `ALTER TYPE "public"."jobs_providertype_enum" RENAME TO "jobs_providertype_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_providertype_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "providerType" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "providerType" TYPE "public"."jobs_providertype_enum" USING "providerType"::"text"::"public"."jobs_providertype_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "providerType" SET DEFAULT '0'`,
    );
    await queryRunner.query(`DROP TYPE "public"."jobs_providertype_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."jobs_jobtype_enum" RENAME TO "jobs_jobtype_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_jobtype_enum" AS ENUM('0', '1', '2', '3', '4')`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" TYPE "public"."jobs_jobtype_enum" USING "jobType"::"text"::"public"."jobs_jobtype_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" SET DEFAULT '4'`,
    );
    await queryRunner.query(`DROP TYPE "public"."jobs_jobtype_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "minAmount" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "maxAmount" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "salaryRange" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" DROP CONSTRAINT "UQ_4213eecf7e05b183b5bdd81cd9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ALTER COLUMN "country" SET DEFAULT 'usa'`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD CONSTRAINT "UQ_4213eecf7e05b183b5bdd81cd9e" UNIQUE ("city", "state", "country")`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801"`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" DROP CONSTRAINT "UQ_4213eecf7e05b183b5bdd81cd9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ALTER COLUMN "country" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD CONSTRAINT "UQ_4213eecf7e05b183b5bdd81cd9e" UNIQUE ("city", "state", "country")`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "salaryRange" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "maxAmount" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "minAmount" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_jobtype_enum_old" AS ENUM('full-time', 'part-time', 'contract', 'remote', 'unknown')`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" TYPE "public"."jobs_jobtype_enum_old" USING "jobType"::"text"::"public"."jobs_jobtype_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" SET DEFAULT 'unknown'`,
    );
    await queryRunner.query(`DROP TYPE "public"."jobs_jobtype_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."jobs_jobtype_enum_old" RENAME TO "jobs_jobtype_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_providertype_enum_old" AS ENUM('first', 'second')`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "providerType" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "providerType" TYPE "public"."jobs_providertype_enum_old" USING "providerType"::"text"::"public"."jobs_providertype_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "providerType" SET DEFAULT 'first'`,
    );
    await queryRunner.query(`DROP TYPE "public"."jobs_providertype_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."jobs_providertype_enum_old" RENAME TO "jobs_providertype_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "companyId"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "remote"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "companiesId" integer`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_8690b1c368a2ec7294969b260af" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
