import { Module } from '@nestjs/common';
import { DevotelService } from './devotel.service';
import { RequestModule } from '../request/request.module';

@Module({
  imports: [RequestModule],
  providers: [DevotelService],
  exports: [DevotelService],
})
export class DevotelModule {}
