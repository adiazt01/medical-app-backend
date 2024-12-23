import { Module } from '@nestjs/common';
import { MainComponentService } from './main-component.service';
import { MainComponentController } from './main-component.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [MainComponentController],
  providers: [MainComponentService, PrismaService],
  imports: [DatabaseModule]
})
export class MainComponentModule {}
