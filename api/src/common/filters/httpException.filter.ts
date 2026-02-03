import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<any>();
    const request = context.getRequest<any>();
    const status = exception.response.statusCode;
    const message = exception.response.message;

    Logger.log(`${request.url} - ${message}`, 'error request!');

    response.status(status).json({
      status,
      data: null,
      meta: {
        message,
      },
    });
  }
}
