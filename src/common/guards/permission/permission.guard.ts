import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permission.decorator';
import { Permission } from '@prisma/client';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<Permission>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredPermission === undefined) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.hasMinimumPermission(user.permission, requiredPermission);
  }

  private hasMinimumPermission(userPermission: Permission, requiredPermission: Permission): boolean {
    const permissionLevels = Object.values(Permission);
    const userPermissionLevel = permissionLevels.indexOf(userPermission);
    const requiredPermissionLevel = permissionLevels.indexOf(requiredPermission);

    return userPermissionLevel >= requiredPermissionLevel;
  }
}