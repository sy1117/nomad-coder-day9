import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'id',
  'password',
  'role',
]) {}
