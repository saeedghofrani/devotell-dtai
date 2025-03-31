import { Module } from '@nestjs/common';
import { LocationRepository } from './repository/location.repository';
import { LocationService } from './service/location.service';

@Module({
  imports: [],
  providers: [LocationRepository, LocationService],
  exports: [LocationRepository, LocationService],
})
export class LocationModule {}
