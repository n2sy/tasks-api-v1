import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRep: Repository<UserEntity>,
  ) {}

  async signin(credentials) {
    //const { email, password } = credentials;
    const newUser = this.userRep.create();

    newUser.username = credentials.username;
    newUser.email = credentials.email;
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(credentials.password, newUser.salt);
    return this.userRep.save(newUser);
  }
}
