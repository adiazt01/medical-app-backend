import { Module } from '@nestjs/common';
import { MainComponentService } from './main-component.service';
import { MainComponentController } from './main-component.controller';

@Module({
  controllers: [MainComponentController],
  providers: [MainComponentService],
})
export class MainComponentModule {}
