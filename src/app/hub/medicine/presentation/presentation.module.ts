import { Module } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { PresentationController } from './presentation.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [PresentationController],
  providers: [PresentationService, PrismaService],
  imports: [DatabaseModule]
})
export class PresentationModule {}
