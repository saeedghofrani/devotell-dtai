import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AxiosError } from 'axios';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';
import { Response } from 'express';
import { ExceptionFilterType } from './exception.type';

@Catch(HttpException, AxiosError, QueryFailedError, EntityNotFoundError)
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
    Logger.warn(message, 'Encountered An Error');
    const date = Date.now();
    this.sendResponse(response, status, message.errors, date);
  }

  private getHttpStatus(exception: ExceptionFilterType): HttpStatus {
    switch (true) {
      case exception instanceof HttpException:
        return exception.getStatus();
      case exception instanceof AxiosError:
        return this.getAxiosErrorStatus(exception);
      case exception instanceof QueryFailedError:
        return HttpStatus.BAD_REQUEST;
      case exception instanceof EntityNotFoundError:
        return HttpStatus.NOT_FOUND;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  private getAxiosErrorStatus(exception: AxiosError): HttpStatus {
    if (exception.response) {
      return exception.response.status;
    }
    return HttpStatus.BAD_REQUEST;
  }

  private getErrorMessage(exception: ExceptionFilterType): {
    errors: object | string | unknown;
  } {
    if (exception instanceof AxiosError) {
      return this.getErrorDetailsAxios(exception);
    }
    if (exception instanceof QueryFailedError) {
      return this.getQueryFailedErrorDetails(exception);
    }
    if (exception instanceof EntityNotFoundError) {
      return this.getEntityNotFoundErrorDetails(exception);
    }
    return this.getErrorDetails(exception);
  }

  private getQueryFailedErrorDetails(exception: QueryFailedError): {
    errors: object | string;
  } {
    const driverError: any = exception.driverError;

    if (driverError.code === '23505') {
      return {
        errors: {
          message: 'Duplicate entry',
          details: this.extractConstraintDetails(driverError),
        },
      };
    }

    if (driverError.code === '23503') {
      return {
        errors: {
          message: 'Reference violation',
          details: this.extractConstraintDetails(driverError),
        },
      };
    }

    return {
      errors: 'Database operation failed',
    };
  }

  private extractConstraintDetails(driverError: any): string {
    return driverError.detail || driverError.message;
  }

  private getEntityNotFoundErrorDetails(exception: EntityNotFoundError): {
    errors: object | string;
  } {
    return {
      errors: 'Requested resource not found',
    };
  }

  private getErrorDetailsAxios(exception: AxiosError): {
    errors: object | string | unknown;
  } {
    const httpStatus = exception.response?.status;
    let errorMessage: unknown;

    if (
      httpStatus &&
      [
        HttpStatus.BAD_REQUEST,
        HttpStatus.UNPROCESSABLE_ENTITY,
        HttpStatus.FORBIDDEN,
        HttpStatus.UNAUTHORIZED,
        HttpStatus.CONFLICT,
        HttpStatus.TOO_MANY_REQUESTS,
        HttpStatus.NOT_FOUND,
      ].includes(httpStatus)
    ) {
      errorMessage = exception.response.data;
    } else {
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

    if (
      [
        HttpStatus.BAD_REQUEST,
        HttpStatus.UNPROCESSABLE_ENTITY,
        HttpStatus.FORBIDDEN,
        HttpStatus.UNAUTHORIZED,
        HttpStatus.CONFLICT,
        HttpStatus.TOO_MANY_REQUESTS,
        HttpStatus.NOT_FOUND,
      ].includes(httpStatus)
    ) {
      errorMessage = exception.getResponse();
    } else {
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
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date(date).toISOString(),
    });
  }
}
