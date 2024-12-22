import { Module } from '@nestjs/common';
import { LaboratoryService } from './laboratory.service';
import { LaboratoryController } from './laboratory.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LaboratoryController],
  providers: [LaboratoryService, PrismaService],
})
export class LaboratoryModule {}
