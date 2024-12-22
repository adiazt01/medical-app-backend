import { SetMetadata } from '@nestjs/common';
import { UserType } from '@prisma/client';

export const USER_TYPE_KEY = 'userType';
export const USER_TYPE = (...userType: UserType[]) => SetMetadata(USER_TYPE_KEY, userType);