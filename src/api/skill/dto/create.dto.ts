import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { JobSkillEntity } from 'src/database/entities/job-skill.entity';

export class CreateSkillDto implements Partial<JobSkillEntity> {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  skill?: string;
}
