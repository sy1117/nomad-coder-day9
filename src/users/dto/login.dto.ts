import { ObjectType, Field } from '@nestjs/graphql';
import { CoreOutput } from 'src/podcast/dtos/output.dto';
import { User } from '../entities/user.entity';

@ObjectType('LoginOutput')
export class LoginOutput extends CoreOutput {
  //   user?: User;
  @Field()
  token?: string;
}
