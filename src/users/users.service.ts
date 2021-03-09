import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create({ id, password, role }: CreateAccountInput) {
    try {
      if (this.userRepository.findOneOrFail({ id })) {
        return {
          ok: false,
          error: `id:${id} already exists `,
        };
      }
      const createdUser = new User();
      createdUser.id = id;
      createdUser.password = password;
      createdUser.role = role;
      return await this.userRepository.save(createdUser);
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
