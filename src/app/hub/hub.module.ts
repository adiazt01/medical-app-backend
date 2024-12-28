import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MedicineModule } from './medicine/medicine.module';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { BranchModule } from './branch/branch.module';
import { EmployeeModule } from './employee/employee.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [AuthModule, UserModule, MedicineModule, LaboratoryModule, BranchModule, EmployeeModule, FileModule]
})
export class HubModule {}
