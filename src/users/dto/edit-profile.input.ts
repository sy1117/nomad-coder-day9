import {
  InputType,
  PickType,
  PartialType,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/podcast/dtos/output.dto';
import { UserOutput } from './see-profile.dto';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['password', 'role'], InputType),
) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {
  @Field({ nullable: true })
  user?: UserOutput;
}
