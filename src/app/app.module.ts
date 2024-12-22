import { Module } from '@nestjs/common';
import { BusinessModule } from './business/business.module';
import { HubModule } from './hub/hub.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BusinessModule,
    HubModule,
  ],
})
export class AppModule {}
