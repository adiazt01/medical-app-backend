import { Module } from '@nestjs/common';
import { TherapeuticActionService } from './therapeutic-action.service';
import { TherapeuticActionController } from './therapeutic-action.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [TherapeuticActionController],
  providers: [TherapeuticActionService, PrismaService],
  imports: [DatabaseModule]
})
export class TherapeuticActionModule {}
