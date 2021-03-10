import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.input';
import { LoginOutput } from './dto/login.dto';
import { SeeProfileOutput } from './dto/see-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreateAccountOutput)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.usersService.create(createAccountInput);
  }

  @Mutation(() => LoginOutput)
  login(@Args('id') id: string, @Args('password') password: string) {
    return this.usersService.login(id, password);
  }

  @UseGuards(AuthGuard)
  @Query(() => SeeProfileOutput)
  async seeProfile(@AuthUser() user: User): Promise<SeeProfileOutput> {
    return await this.usersService.findById(user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EditProfileOutput)
  editProfile(
    @AuthUser() user: User,
    @Args('editProfileInput') editProfileInput: EditProfileInput,
  ) {
    return this.usersService.update(user, editProfileInput);
  }
}
