import { IUserRepository } from 'src/modules/users/db/user.repository.interface';
import { SignInDTO } from '../dto/signIn.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IPasswordHash } from 'src/utils/hashPassword/passwordHash.interface';
import { JwtService } from '@nestjs/jwt';

export type ResponseToken = {
  access_token: string;
};

@Injectable()
export class SignInUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHash: IPasswordHash,
    private jwtService: JwtService,
  ) {}

  async execute(data: SignInDTO): Promise<ResponseToken> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_GATEWAY);
    }
    const passwordAreEqual = await this.passwordHash.compare(
      data.password,
      user.password,
    );

    if (!passwordAreEqual) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      ...user,
    };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
