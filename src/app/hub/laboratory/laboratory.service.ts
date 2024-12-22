import { Injectable } from '@nestjs/common';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { Laboratory } from '@prisma/client';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';

@Injectable()
export class LaboratoryService {
  constructor(private prismaService: PrismaService) {}

  create(createLaboratoryDto: CreateLaboratoryDto) : Promise<Laboratory> {
    try {
      const { address, email, name, phone} = createLaboratoryDto;

      const laboratory = this.prismaService.laboratory.create({
        data: {
          address, 
          email,
          name,
          phone,
        }
      })
      return laboratory;
    } catch (error) {
      throw error;
    }
  }

  findAll(paginationDto: PaginationDto) {
    
  }

  findOne(id: number) {
    return `This action returns a #${id} laboratory`;
  }

  update(id: number, updateLaboratoryDto: UpdateLaboratoryDto) {
    return `This action updates a #${id} laboratory`;
  }

  remove(id: number) {
    return `This action removes a #${id} laboratory`;
  }
}
