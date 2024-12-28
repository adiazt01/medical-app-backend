import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { DatabaseModule } from '@/common/database/database.module';
import { UploadModule } from '@/common/upload/upload.module';
import { PrismaService } from '@/common/database/prisma.service';
import { UploadService } from '@/common/upload/upload.service';

@Module({
  controllers: [FileController],
  providers: [FileService, PrismaService, UploadService],
  imports: [DatabaseModule, UploadModule]
})
export class FileModule {}
