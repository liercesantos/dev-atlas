import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    let user;
    if (context.getType<string>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      user = ctx.getContext().req.user;
    } else {
      const request = context.switchToHttp().getRequest();
      user = request.user;
    }

    if (!data) return user;
    return user ? user[data] : undefined;
  },
);
