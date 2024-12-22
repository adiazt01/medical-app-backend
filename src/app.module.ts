import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule as SubAppModule } from './app/app.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [SubAppModule, AppModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
