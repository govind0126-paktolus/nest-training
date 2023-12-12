import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  store(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.store(createUserDTO);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Patch('/:userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return this.userService.updateUser(userId, updateUserDTO);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
