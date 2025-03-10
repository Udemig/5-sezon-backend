import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // yapılan api isteği için request objesini al
    const request = ctx.switchToHttp().getRequest();

    console.log(request.user);

    // data varsa user objesinin içindeki data'yı döndür
    if (data) {
      return request.user[data];
    }

    // data yoksa user objesini döndür
    return request.user;
  },
);
