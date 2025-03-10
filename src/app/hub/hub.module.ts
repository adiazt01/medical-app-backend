import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MedicineModule } from './medicine/medicine.module';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { BranchModule } from './branch/branch.module';
import { FileModule } from './file/file.module';

@Global()
@Module({
  imports: [AuthModule, UserModule, MedicineModule, LaboratoryModule, BranchModule, FileModule]
})
export class HubModule {}
