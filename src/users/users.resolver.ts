import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateAccountInput } from './dto/create-account.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.usersService.create(createAccountInput);
  }

  @Mutation(() => User)
  login(@Args('id') id: string, @Args('password') password: string) {
    return this.usersService.login(id, password);
  }
}
