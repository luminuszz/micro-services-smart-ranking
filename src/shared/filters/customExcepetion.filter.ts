import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common'
import { formatterJSON } from '@shared/utils/formatters'
import { Response, Request } from 'express'

export class GlobalException implements ExceptionFilter {
  private getValidObject(request: Request): Record<string, any> {
    const { query, body, params } = request

    const values = { query, body, params }

    const filteredObject = Object.keys(values).find(
      item => Object.keys(values[item]).length !== 0
    )

    return { [filteredObject]: values[filteredObject] }
  }

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()

    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const exceptionResponse = exception.getResponse() as Record<any, string>

    const httpStatus = exception.getStatus()

    const args = this.getValidObject(request)

    response.status(httpStatus).json({
      statusCode: httpStatus || '400',
      exceptionResponse: exceptionResponse.message,
      path: request.url,
      method: request.method,
      args,

      timeStamp: new Date().toUTCString(),
    })
  }
}
