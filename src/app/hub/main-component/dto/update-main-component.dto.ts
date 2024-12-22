import { PartialType } from '@nestjs/mapped-types';
import { CreateMainComponentDto } from './create-main-component.dto';

export class UpdateMainComponentDto extends PartialType(CreateMainComponentDto) {}
