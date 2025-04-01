import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobType1743436748596 implements MigrationInterface {
  name = 'JobType1743436748596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."jobs_jobtype_enum" RENAME TO "jobs_jobtype_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_jobtype_enum" AS ENUM('Full-Time', 'Part-Time', 'Contract', 'Remote', 'Unknown')`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" TYPE "public"."jobs_jobtype_enum" USING "jobType"::"text"::"public"."jobs_jobtype_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" SET DEFAULT 'Unknown'`,
    );
    await queryRunner.query(`DROP TYPE "public"."jobs_jobtype_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_jobtype_enum_old" AS ENUM('0', '1', '2', '3', '4')`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" TYPE "public"."jobs_jobtype_enum_old" USING "jobType"::"text"::"public"."jobs_jobtype_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "jobType" SET DEFAULT '4'`,
    );
    await queryRunner.query(`DROP TYPE "public"."jobs_jobtype_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."jobs_jobtype_enum_old" RENAME TO "jobs_jobtype_enum"`,
    );
  }
}
