import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, IsEnum } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export enum UserRole {
  HOST = 'HOST',
  LISTENER = 'LISTENER',
}
@ObjectType()
@Entity()
export class User {
  @PrimaryColumn()
  @Field(() => String)
  @IsString()
  id: string;

  @Column({ select: false })
  @Field(() => String)
  @IsString()
  password: string;

  // @Column({
  //   type: 'enum',
  //   enum: UserRole,
  // })
  // @Field(() => UserRole)
  // @IsEnum(UserRole)
  @Column()
  @Field(type => String)
  @IsEnum(UserRole, {
    message: "role must be 'HOST' or 'LISTENER'",
  })
  role: UserRole;

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
