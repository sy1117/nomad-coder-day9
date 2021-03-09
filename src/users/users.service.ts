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

  create({id, password, role}: CreateAccountInput) {
    const createdUser = new User();
    createdUser.id=id;
    createdUser.password=this.jwtService.sign(user)
    return;
  }
}
