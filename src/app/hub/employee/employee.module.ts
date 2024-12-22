import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PositionModule } from './position/position.module';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [PositionModule],
})
export class EmployeeModule {}
