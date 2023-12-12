/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDTO, toCreateUserDto } from './DTO/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './DTO/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async store(createUserDTO: CreateUserDTO) {
    const userToSave = await toCreateUserDto(createUserDTO);
    return this.usersRepository.save(userToSave);
  }

  getUsers() {
    return this.usersRepository.find();
  }

  getUser(id1: number) {
    return this.usersRepository.findOne({ where: { id: id1 } });
  }

  updateUser(id: number, updateUserDTO: UpdateUserDTO) {
    return this.usersRepository.update(id, updateUserDTO);
  }

  deleteUser(id: number) {
    return this.usersRepository.delete(id);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
