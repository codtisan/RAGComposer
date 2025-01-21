import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UserLoginResponseDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from 'src/util/password-hash.util';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserLoginResponseDto> {
    const user = await this.userService.findUser(loginUserDto);
    const isPasswordMatch = await checkPassword(loginUserDto.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.signAsync({ email: user.email });
    return {
      statusCode: 200,
      message: 'Login successful',
      timestamp: new Date(),
      data: {
        token,
      },
    };
  }
}
