import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MedicineModule } from './medicine/medicine.module';

@Global()
@Module({
  imports: [UserModule, AuthModule, MedicineModule],
  providers: [],
})
export class BusinessModule {}
