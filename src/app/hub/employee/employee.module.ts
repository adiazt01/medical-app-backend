import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PositionModule } from './position/position.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
  imports: [PositionModule, DatabaseModule],
})
export class EmployeeModule {}
