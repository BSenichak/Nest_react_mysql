// typeorm-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const message = exception.message;
    const status = message.includes('Duplicate entry') 
      ? HttpStatus.CONFLICT 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: message.includes('Duplicate entry') 
        ? 'Користувач з такою поштою вже існує' 
        : 'Помилка бази даних',
      error: 'Conflict',
    });
  }
}