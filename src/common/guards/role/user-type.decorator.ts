import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_TYPE_KEY } from './user-type.guard';
import { UserType } from '@prisma/client';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredUserType = this.reflector.getAllAndOverride<UserType[]>(USER_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
 
    if (!requiredUserType) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredUserType.some((userType) => user.permission?.includes(userType));
  }
}
