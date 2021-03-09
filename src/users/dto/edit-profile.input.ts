import { InputType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class EditProfileInput extends OmitType(User, ['password', 'role']) {}
