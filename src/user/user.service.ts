import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dtos/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  public async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }

  public async createUser( data: CreateUserInput): Promise<User>{
    const user = this.userRepository.create(data);

    const userSaved = await this.userRepository.save(user)

    if(!userSaved) {
      throw new InternalServerErrorException('Erro ao criar usuário')
    }

    return user;
  }
}
