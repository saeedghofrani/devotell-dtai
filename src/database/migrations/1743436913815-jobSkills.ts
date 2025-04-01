import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobSkills1743436913815 implements MigrationInterface {
  name = 'JobSkills1743436913815';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "_JobToJobSkill" ("jobsId" integer NOT NULL, "jobSkillsId" integer NOT NULL, CONSTRAINT "PK_fee3c08bddde242632dc66dc540" PRIMARY KEY ("jobsId", "jobSkillsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8868e3ad16a98b891b7bc957e8" ON "_JobToJobSkill" ("jobsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06e7b597e8147a526788778e70" ON "_JobToJobSkill" ("jobSkillsId") `,
    );
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
    await queryRunner.query(
      `ALTER TABLE "_JobToJobSkill" ADD CONSTRAINT "FK_8868e3ad16a98b891b7bc957e86" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "_JobToJobSkill" ADD CONSTRAINT "FK_06e7b597e8147a526788778e705" FOREIGN KEY ("jobSkillsId") REFERENCES "job_skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "_JobToJobSkill" DROP CONSTRAINT "FK_06e7b597e8147a526788778e705"`,
    );
    await queryRunner.query(
      `ALTER TABLE "_JobToJobSkill" DROP CONSTRAINT "FK_8868e3ad16a98b891b7bc957e86"`,
    );
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
    await queryRunner.query(
      `DROP INDEX "public"."IDX_06e7b597e8147a526788778e70"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8868e3ad16a98b891b7bc957e8"`,
    );
    await queryRunner.query(`DROP TABLE "_JobToJobSkill"`);
  }
}
