import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/signIn.dto';
import { ResponseToken, SignInUseCase } from './useCases/signIn.usecase';

@Controller('/login')
export class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post()
  async signIn(@Body() data: SignInDTO): Promise<ResponseToken> {
    return await this.signInUseCase.execute(data);
  }
}
