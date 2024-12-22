import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MedicineModule } from './medicine/medicine.module';
import { TherapeuticActionModule } from './therapeutic-action/therapeutic-action.module';
import { PresentationModule } from './presentation/presentation.module';
import { MainComponentModule } from './main-component/main-component.module';

@Module({
  imports: [AuthModule, UserModule, MedicineModule, TherapeuticActionModule, PresentationModule, MainComponentModule]
})
export class HubModule {}
