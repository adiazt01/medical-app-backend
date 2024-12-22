import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [PositionController],
  providers: [PositionService, PrismaService],
  imports: [DatabaseModule]
})
export class PositionModule {}
