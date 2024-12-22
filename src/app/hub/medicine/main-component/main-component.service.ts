import { Injectable } from '@nestjs/common';
import { CreateMainComponentDto } from './dto/create-main-component.dto';
import { UpdateMainComponentDto } from './dto/update-main-component.dto';

@Injectable()
export class MainComponentService {
  create(createMainComponentDto: CreateMainComponentDto) {
    return 'This action adds a new mainComponent';
  }

  findAll() {
    return `This action returns all mainComponent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mainComponent`;
  }

  update(id: number, updateMainComponentDto: UpdateMainComponentDto) {
    return `This action updates a #${id} mainComponent`;
  }

  remove(id: number) {
    return `This action removes a #${id} mainComponent`;
  }
}
