import { RpcException } from '@nestjs/microservices';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    if(
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ){
      const status = rpcError.status;
      return response.status(status).json(rpcError);
    }

    console.log('rpcError', rpcError);
    response.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}