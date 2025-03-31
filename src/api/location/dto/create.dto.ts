import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LocationEntity } from 'src/database/entities/location.entity';

export class CreateLocationDto implements Partial<LocationEntity> {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  country?: string;
}
