import { Module } from '@nestjs/common';
import { SkillRepository } from './repository/skill.repository';
import { SkillService } from './service/skill.service';

@Module({
  imports: [],
  providers: [SkillRepository, SkillService],
  exports: [SkillRepository, SkillService],
})
export class SkillModule {}
