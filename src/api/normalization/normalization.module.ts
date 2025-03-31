import { Module } from '@nestjs/common';
import { NormalizationService } from './service/normalization.service';

@Module({
  imports: [],
  providers: [NormalizationService],
  exports: [NormalizationService],
})
export class NormalizationModule {}
