import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseStructure1743276149523 implements MigrationInterface {
  name = 'BaseStructure1743276149523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "companies" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(255) NOT NULL, "industry" character varying(100), "website" character varying(255), CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"), CONSTRAINT "UQ_3e7b86aa8b4ffe84947ff29c0b3" UNIQUE ("website"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job_skills" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "skill" character varying(150) NOT NULL, CONSTRAINT "PK_79dc7f5be80bfe7a4e590a71041" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_providertype_enum" AS ENUM('first', 'second')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_jobtype_enum" AS ENUM('full-time', 'part-time', 'contract', 'remote', 'unknown')`,
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "providerId" character varying(50) NOT NULL, "providerType" "public"."jobs_providertype_enum" NOT NULL DEFAULT 'first', "jobType" "public"."jobs_jobtype_enum" NOT NULL DEFAULT 'unknown', "experience" integer NOT NULL DEFAULT '0', "position" character varying(255), "postedDate" TIMESTAMP WITH TIME ZONE NOT NULL, "minAmount" numeric(12,2), "maxAmount" numeric(12,2), "currency" character varying(3) NOT NULL DEFAULT 'USD', "salaryRange" character varying(100), "companiesId" integer, "locationId" integer, CONSTRAINT "UQ_3f7e37aec7a0873cc5c59adc56e" UNIQUE ("providerId"), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "city" character varying(100), "state" character varying(100), "country" character varying(100), CONSTRAINT "UQ_4213eecf7e05b183b5bdd81cd9e" UNIQUE ("city", "state", "country"), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "jobs_skills_job_skills" ("jobsId" integer NOT NULL, "jobSkillsId" integer NOT NULL, CONSTRAINT "PK_93b2f5d179fa15fca998568f2b0" PRIMARY KEY ("jobsId", "jobSkillsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bedaaa3ee18a5b099284e41d00" ON "jobs_skills_job_skills" ("jobsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be5ddaea7b358ef4223de81334" ON "jobs_skills_job_skills" ("jobSkillsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_8690b1c368a2ec7294969b260af" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_5dbffa782dc6074a7e4cb39150d" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs_skills_job_skills" ADD CONSTRAINT "FK_bedaaa3ee18a5b099284e41d008" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs_skills_job_skills" ADD CONSTRAINT "FK_be5ddaea7b358ef4223de81334c" FOREIGN KEY ("jobSkillsId") REFERENCES "job_skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs_skills_job_skills" DROP CONSTRAINT "FK_be5ddaea7b358ef4223de81334c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs_skills_job_skills" DROP CONSTRAINT "FK_bedaaa3ee18a5b099284e41d008"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_5dbffa782dc6074a7e4cb39150d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_8690b1c368a2ec7294969b260af"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_be5ddaea7b358ef4223de81334"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bedaaa3ee18a5b099284e41d00"`,
    );
    await queryRunner.query(`DROP TABLE "jobs_skills_job_skills"`);
    await queryRunner.query(`DROP TABLE "locations"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_jobtype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_providertype_enum"`);
    await queryRunner.query(`DROP TABLE "job_skills"`);
    await queryRunner.query(`DROP TABLE "companies"`);
  }
}
