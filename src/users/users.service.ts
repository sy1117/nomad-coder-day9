import { Injectable, Global } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '../jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.input';
import { LoginOutput } from './dto/login.dto';
import { SeeProfileOutput } from './dto/see-profile.dto';
@Injectable()
@Global()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findById(id: string): Promise<SeeProfileOutput> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        return {
          ok: false,
          error: `id:${id} not exists `,
        };
      }
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async create({
    id,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      if (await this.userRepository.findOne({ id })) {
        return {
          ok: false,
          error: `id:${id} already exists `,
        };
      }
      const createdUser = new User();
      createdUser.id = id;
      createdUser.password = password;
      createdUser.role = role;
      const user = await this.userRepository.save(createdUser).catch(reason => {
        throw Error(reason);
      });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async login(id: string, password: string): Promise<LoginOutput> {
    try {
      const user = await this.userRepository.findOneOrFail();

      if (user.checkPassword(password)) {
        const token = await this.jwtService.sign(user.id);
        return {
          ok: true,
          token,
        };
      } else {
        return {
          ok: false,
          error: 'password incorrect',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async update(
    { id }: User,
    editUserProfile: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      console.log(user);
      if (editUserProfile.password) {
        user.password = editUserProfile.password;
      }
      if (editUserProfile.role) {
        user.role = editUserProfile.role;
      }
      const updatedUser = await this.userRepository.save(user);
      return {
        ok: true,
        user: user,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
