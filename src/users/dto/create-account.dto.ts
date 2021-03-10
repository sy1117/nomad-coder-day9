import { InputType, Int, Field, PickType, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/podcast/dtos/output.dto';
import { Entity } from 'typeorm';

@InputType('CreateAccountInput')
export class CreateAccountInput extends PickType(
  User,
  ['id', 'password', 'role'],
  InputType,
) {}

@ObjectType('CreateAccountOutput')
export class CreateAccountOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
