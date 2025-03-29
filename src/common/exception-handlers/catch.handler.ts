import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AxiosError } from 'axios';
import { Response } from 'express';
import { ExceptionFilterType } from './exception.type';

@Catch(HttpException, AxiosError)
export class HttpExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  public catch(exception: ExceptionFilterType, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.getHttpStatus(exception);
    const message: { errors: object | string | unknown } =
      this.getErrorMessage(exception);
    const date = Date.now();
    this.sendResponse(response, status, message.errors, date);
  }

  private getHttpStatus(exception: ExceptionFilterType): HttpStatus {
    switch (true) {
      case exception instanceof HttpException:
        return exception.getStatus();
      case exception instanceof AxiosError:
        const axiosError = exception as AxiosError;
        if (axiosError.response) {
          return axiosError.response.status;
        }
        return HttpStatus.BAD_REQUEST;
      default: {
        return HttpStatus.INTERNAL_SERVER_ERROR;
      }
    }
  }

  private getErrorMessage(exception: ExceptionFilterType): {
    errors: object | string | unknown;
  } {
    if (exception instanceof AxiosError)
      return this.getErrorDetailsAxios(exception as AxiosError);

    return this.getErrorDetails(exception);
  }

  private getErrorDetailsAxios(exception: AxiosError): {
    errors: object | string | unknown;
  } {
    const httpStatus = exception.response.status;
    let errorMessage: unknown;
    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST:
      case HttpStatus.UNPROCESSABLE_ENTITY:
      case HttpStatus.FORBIDDEN:
      case HttpStatus.UNAUTHORIZED:
      case HttpStatus.CONFLICT:
      case HttpStatus.TOO_MANY_REQUESTS:
      case HttpStatus.NOT_FOUND:
        {
          errorMessage = exception.response.data;
        }
        break;
      default:
        errorMessage =
          'Sorry! Something went wrong on our end. Please try again later.';
    }
    return {
      errors: typeof errorMessage === 'string' ? [errorMessage] : errorMessage,
    };
  }

  private getErrorDetails(exception: HttpException): {
    errors: object | string;
  } {
    const httpStatus = exception.getStatus();
    let errorMessage: object | string;

    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST:
      case HttpStatus.UNPROCESSABLE_ENTITY:
      case HttpStatus.FORBIDDEN:
      case HttpStatus.UNAUTHORIZED:
      case HttpStatus.CONFLICT:
      case HttpStatus.TOO_MANY_REQUESTS:
      case HttpStatus.NOT_FOUND:
        {
          errorMessage = exception.getResponse();
        }
        break;
      default:
        errorMessage =
          'Sorry! Something went wrong on our end. Please try again later.';
    }

    return {
      errors: typeof errorMessage === 'string' ? [errorMessage] : errorMessage,
    };
  }

  private sendResponse(
    response: Response,
    status: HttpStatus,
    message: object | string | unknown,
    date: number,
  ): void {
    response.status(status).json({ message, timestamp: date });
  }
}
