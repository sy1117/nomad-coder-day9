import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Role } from '../enums/role.enum';
import { Entity, Column } from 'typeorm';
import { IsString, IsEnum } from 'class-validator';
import { isEnumType } from 'graphql';

@ObjectType()
@Entity()
export class User {
  @Column()
  @Field(() => String)
  @IsString()
  id: string;

  @Column()
  @Field(() => String)
  @IsString()
  password: string;

  @Column()
  @Field(() => Role)
  @IsEnum(Role)
  role: Role;
}
