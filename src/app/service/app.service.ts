import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public health(): boolean {
    return true;
  }
}
