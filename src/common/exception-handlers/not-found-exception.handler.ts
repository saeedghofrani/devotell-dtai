import { NotFoundException } from '@nestjs/common';

export function NotFoundHandler<T>(data?: T, message?: string): void {
  if (!data) throw new NotFoundException(message);
}
