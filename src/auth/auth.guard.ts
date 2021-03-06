import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
// import { AllowedRoles } from './role.decorator';
import { User } from '../users/entities/user.entity';
import { AllowedRoles } from './role.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    // without @Role => public
    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];
    console.log(user);
    if (user) {
      // without @Role(["Any"]) => all logged in user
      // if (roles.includes('Any')) return true;
      // @Role["Client", "Delivery", ...]
      // return roles.includes(user.role);
      return true;
    }
    return false;
  }
}
