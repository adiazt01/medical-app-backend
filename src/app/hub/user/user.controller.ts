import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';
import { AuthHubGuard } from '../auth/auth-hub/auth-hub.guard';
import { HUB } from '@/common/constants/prefix/hub.prefix';

@Controller(HUB.USER)
@UseGuards(AuthHubGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

    @Get()
    async getUser(@Query() PaginationDto?: PaginationDto) {
        return await this.userService.listAll(PaginationDto);
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findOneById(id);
    }
}