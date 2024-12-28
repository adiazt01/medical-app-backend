import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/database/prisma.service';
import { UploadService } from '@/common/upload/upload.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    private prismaService: PrismaService,
    private uploadService: UploadService
  ) { }

  async create(file: Express.Multer.File, folder: string) {
    try {
      const uuid = uuidv4();
      const { fullPath, id, path } = await this.uploadService.uploadImage(file,
        uuid, folder);
      const fileName = file.originalname.split('.').slice(0, -1).join('.');

      return await this.prismaService.file.create({
        data: {
          name: uuid,
          originalName: fileName,
          mimeType: file.mimetype,
          fullPath: fullPath,
          path: path,
          uploadId: id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.file.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.file.findUnique({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      await this.uploadService.deleteImage(id.toString(), 'files');
      return await this.prismaService.file.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
