import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma.service';
import { UserController } from './user.controller';
import { CostumerService } from './costumer/costumer.service';
import { EmployeeService } from './employee/employee.service';
import { CostumerController } from './costumer/costumer.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, PrismaService, CostumerService, EmployeeService],
  exports: [UserService],
  controllers: [UserController, CostumerController],
})
export class UserModule {}
