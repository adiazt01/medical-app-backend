import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { PaginationDto } from "src/common/database/dto/pagination.dto";
import { AuthHubGuard } from "../auth/auth-hub/auth-hub.guard";
<<<<<<< HEAD
import { HUB } from '@/common/constants/prefix/hub.prefix';
=======
import { HUB } from "@/common/constants/prefix/hub.prefix";
>>>>>>> b21e2d5f26b444349e3164907cb69d4622915909

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