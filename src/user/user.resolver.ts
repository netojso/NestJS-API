import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dtos/create-user.input';
import { User } from './user.entity';


@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService
  ){}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAllUsers();

    return users;
  }

  @Mutation(() => User)
  async createUser(
    @Args('data') data: CreateUserInput
  ): Promise<User> {
    const user = await this.userService.createUser(data);

    return user
  }
}
