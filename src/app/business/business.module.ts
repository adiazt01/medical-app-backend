import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MedicineModule } from './medicine/medicine.module';
import { PaymentModule } from './payment/payment.module';

@Global()
@Module({
  imports: [UserModule, AuthModule, MedicineModule, PaymentModule],
  providers: [],
})
export class BusinessModule {}
