import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [BranchController],
  imports: [DatabaseModule],
  providers: [BranchService, PrismaService],
})
export class BranchModule {}
