import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    console.log(gqlContext['user']);
    return gqlContext['user'];
  },
);
