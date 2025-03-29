import { BadRequestException } from '@nestjs/common';

export function BadRequestHandler<T>(data: T, message: string): void {
  if (!data) throw new BadRequestException(message);
}
