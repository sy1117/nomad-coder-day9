import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Role } from '../enums/role.enum';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsString, IsEnum } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(password, this.password);
      return ok;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
