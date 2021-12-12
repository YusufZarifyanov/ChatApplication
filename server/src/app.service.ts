import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {

  constructor(
  ) {}

  async getHello(dto) {
    return console.log(1)
  }
}
