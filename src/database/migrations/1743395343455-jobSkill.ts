import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobSkill1743395343455 implements MigrationInterface {
  name = 'JobSkill1743395343455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD CONSTRAINT "UQ_2023ecff836fc0a3baf620ab451" UNIQUE ("skill")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_skills" DROP CONSTRAINT "UQ_2023ecff836fc0a3baf620ab451"`,
    );
  }
}
