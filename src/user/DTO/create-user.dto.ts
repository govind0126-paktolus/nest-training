/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcrypt';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  async hashPassword() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
export const toCreateUserDto = async (data: CreateUserDTO): Promise<CreateUserDTO> => {
  const createUserDTO = new CreateUserDTO();
  createUserDTO.name = data.name;
  createUserDTO.email = data.email;
  createUserDTO.password = data.password;
  await createUserDTO.hashPassword(); 
  return createUserDTO;
};