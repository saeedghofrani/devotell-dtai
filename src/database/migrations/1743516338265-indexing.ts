import { MigrationInterface, QueryRunner } from 'typeorm';

export class Indexing1743516338265 implements MigrationInterface {
  name = 'Indexing1743516338265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_3dacbb3eb4f095e29372ff8e13" ON "companies" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2023ecff836fc0a3baf620ab45" ON "job_skills" ("skill") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_764a76c5bc34d1ee2fc3122919" ON "jobs" ("position") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_499a809ce235a6cd85285d4d69" ON "jobs" ("postedDate") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f1a9093eafe4afa3a5ee8ca096" ON "locations" ("city") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8d86e811a6eeb8a467fdbb0152" ON "locations" ("state") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8d86e811a6eeb8a467fdbb0152"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f1a9093eafe4afa3a5ee8ca096"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_499a809ce235a6cd85285d4d69"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_764a76c5bc34d1ee2fc3122919"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2023ecff836fc0a3baf620ab45"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3dacbb3eb4f095e29372ff8e13"`,
    );
  }
}
