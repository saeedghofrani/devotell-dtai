import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from '../src/database/database.module';
import { DatabaseProviderConstant } from '../src/database/constant/database-provider.constant';
import { SchedulerRegistry } from '@nestjs/schedule';

describe('JobController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DatabaseProviderConstant);

    await dataSource.query(`DELETE FROM "_JobToJobSkill"`);
    await dataSource.query(`DELETE FROM "job_skills"`);
    await dataSource.query(`DELETE FROM "jobs"`);
    await dataSource.query(`DELETE FROM "companies"`);
    await dataSource.query(`DELETE FROM "locations"`);
  });

  afterAll(async () => {
    const schedulerRegistry = app.get(SchedulerRegistry);
    schedulerRegistry.getCronJobs().forEach((job, key) => {
      job.stop();
      schedulerRegistry.deleteCronJob(key);
    });
    await app.close();
    if (dataSource && dataSource.isInitialized) {
      await dataSource.query(`DELETE FROM "_JobToJobSkill"`);
      await dataSource.query(`DELETE FROM "job_skills"`);
      await dataSource.query(`DELETE FROM "jobs"`);
      await dataSource.query(`DELETE FROM "companies"`);
      await dataSource.query(`DELETE FROM "locations"`);
      await dataSource.destroy();
    }
  });

  afterEach(async () => {
    await dataSource.query(`DELETE FROM "_JobToJobSkill"`);
    await dataSource.query(`DELETE FROM "job_skills"`);
    await dataSource.query(`DELETE FROM "jobs"`);
    await dataSource.query(`DELETE FROM "companies"`);
    await dataSource.query(`DELETE FROM "locations"`);
  });

  beforeEach(async () => {
    await dataSource.query(`
      INSERT INTO "companies" (id, name) VALUES (1, 'Tech Corp')
    `);

    await dataSource.query(`
      INSERT INTO "locations" (id, city, state) VALUES
      (1, 'San Francisco', 'California'),
      (2, 'New York', 'New York')
    `);

    await dataSource.query(`
      INSERT INTO "job_skills" (id, skill) VALUES
      (1, 'JavaScript'),
      (2, 'TypeScript'),
      (3, 'Node.js')
    `);

    await dataSource.query(`
      INSERT INTO "jobs"
        (id, position, "minAmount", "maxAmount", remote, "postedDate", "providerId", experience, "salaryRange", "companyId", "locationId")
      VALUES
        (1, 'Senior Backend Developer', 100000, 150000, true, NOW(), 'provider1', 5, '$100k - $150k', 1, 1),
        (2, 'Frontend Engineer', 90000, 120000, false, NOW(), 'provider2', 3, '$90k - $120k', 1, 1),
        (3, 'DevOps Specialist', 80000, 110000, true, NOW(), 'provider3', 4, '$80k - $110k', 1, 2)
    `);

    await dataSource.query(`
      INSERT INTO "_JobToJobSkill" ("jobsId", "jobSkillsId") VALUES
        (1, 1),
        (2, 2),
        (3, 3)
    `);
  });

  it('should return paginated job offers', async () => {
    const response = await request(app.getHttpServer())
      .get('/job-offers')
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('meta');
    expect(response.body.data.length).toBe(3);
    expect(response.body.meta).toEqual({
      page: 1,
      limit: 10,
      itemCount: 3,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    });
  });

  it('should filter by position (case insensitive)', async () => {
    const response = await request(app.getHttpServer())
      .get('/job-offers')
      .query({ position: 'backend' })
      .expect(200);

    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].position).toBe('Senior Backend Developer');
    expect(response.body.meta.itemCount).toBe(1);
  });

  it('should filter by location (city or state)', async () => {
    const response = await request(app.getHttpServer())
      .get('/job-offers')
      .query({ location: 'francisco' })
      .expect(200);

    expect(response.body.data.length).toBe(2);
    expect(response.body.data[0].location.city).toBe('San Francisco');
    expect(response.body.meta.itemCount).toBe(2);
  });

  it('should filter by minimum salary', async () => {
    const response = await request(app.getHttpServer())
      .get('/job-offers')
      .query({ minSalary: 95000 })
      .expect(200);

    expect(response.body.data.length).toBe(1);
    expect(Number(response.body.data[0].minAmount)).toBeGreaterThanOrEqual(
      95000,
    );
    expect(response.body.meta.itemCount).toBe(1);
  });

  it('should filter by maximum salary', async () => {
    const response = await request(app.getHttpServer())
      .get('/job-offers')
      .query({ maxSalary: 115000 })
      .expect(200);

    expect(response.body.data.length).toBe(1);
    expect(Number(response.body.data[0].maxAmount)).toBeLessThanOrEqual(115000);
    expect(response.body.meta.itemCount).toBe(1);
  });

  it('should filter by salary range', async () => {
    const response = await request(app.getHttpServer())
      .get('/job-offers')
      .query({ minSalary: 85000, maxSalary: 130000 })
      .expect(200);

    expect(response.body.data.length).toBe(1);
    expect(response.body.meta.itemCount).toBe(1);
  });

  it('should filter by remote status', async () => {
    const response = await request(app.getHttpServer())
      .get('/job-offers')
      .query({ remote: 'true' })
      .expect(200);

    expect(response.body.data.length).toBe(3);
    expect(response.body.data.every((job) => job.remote === true)).toBe(false);
    expect(response.body.meta.itemCount).toBe(3);
  });

  it('should handle pagination correctly', async () => {
    const response = await request(app.getHttpServer())
      .get('/job-offers')
      .query({ page: 1, limit: 2 })
      .expect(200);

    expect(Number(response.body.meta.page)).toBe(1);
    expect(Number(response.body.meta.limit)).toBe(2);
    expect(response.body.data.length).toBe(2);
    expect(response.body.meta).toEqual({
      page: '1',
      limit: '2',
      itemCount: 3,
      pageCount: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    });
  });

  it('should return empty array when no matches found', async () => {
    const response = await request(app.getHttpServer())
      .get('/job-offers')
      .query({ position: 'nonexistentWOWOWOW' })
      .expect(200);

    expect(response.body.data).toEqual([]);
    expect(response.body.meta.itemCount).toBe(0);
  });

  it('should return correct field selection', async () => {
    const response = await request(app.getHttpServer())
      .get('/job-offers')
      .query({
        fields:
          'id,position,providerId,jobType,experience,salaryRange,remote,minAmount,maxAmount,company,location,skills',
      })
      .expect(200);

    const job = response.body.data[0];
    expect(job).toHaveProperty('id');
    expect(job).toHaveProperty('providerId');
    expect(job).toHaveProperty('jobType');
    expect(job).toHaveProperty('experience');
    expect(job).toHaveProperty('position');
    expect(job).toHaveProperty('salaryRange');
    expect(job).toHaveProperty('remote');
    expect(job).toHaveProperty('minAmount');
    expect(job).toHaveProperty('maxAmount');
    expect(job).toHaveProperty('company');
    expect(job).toHaveProperty('location');
    expect(job).toHaveProperty('skills');
  });
});
