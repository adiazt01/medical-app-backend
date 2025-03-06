import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineDto } from './create-medicine-query.dto';

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {}
