import { ObjectType, Field, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../podcast/dtos/output.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserOutput extends PickType(User, ['id', 'role']) {}

@ObjectType('SeeProfileOutput')
export class SeeProfileOutput extends CoreOutput {
  @Field()
  user?: UserOutput;
}
