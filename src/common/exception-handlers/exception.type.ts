import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';

export type ExceptionFilterType = AxiosError | HttpException;
