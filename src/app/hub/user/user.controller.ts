import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthHubGuard } from "../auth/auth-hub/auth-hub.guard";
import { HUB } from "@/common/constants/prefix/hub.prefix";
import { UserPaginationDto } from "./dto/user-pagination.dto";

@Controller(HUB.USERS)
@UseGuards(AuthHubGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

    @Get()
    async getUser(@Query() PaginationDto?: UserPaginationDto) {
        return await this.userService.findAll(PaginationDto);
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findOneById(id);
    }
}