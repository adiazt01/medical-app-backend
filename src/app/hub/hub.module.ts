import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MedicineModule } from './medicine/medicine.module';
import { TherapeuticActionModule } from './therapeutic-action/therapeutic-action.module';
import { PresentationModule } from './presentation/presentation.module';
import { MainComponentModule } from './main-component/main-component.module';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { BranchModule } from './branch/branch.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [AuthModule, UserModule, MedicineModule, TherapeuticActionModule, PresentationModule, MainComponentModule, LaboratoryModule, BranchModule, EmployeeModule]
})
export class HubModule {}
