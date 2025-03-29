import { ConflictException } from '@nestjs/common';

export function ConflictHandler<T>(data?: T, message?: string): void {
  if (!data) throw new ConflictException(message);
}
