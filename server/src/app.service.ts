import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {

  constructor(
    private readonly authService: AuthService
  ) {}

  async getHello(dto) {
    return await this.authService.login(dto.email, dto.password)
  }

  async aaa() {
    return 'hello world'!
  }
}
