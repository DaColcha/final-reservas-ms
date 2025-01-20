import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//Decorador de parámetro personalizado
export const RawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.rawHeaders;
  },
);
