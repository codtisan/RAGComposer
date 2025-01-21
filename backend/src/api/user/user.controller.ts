import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ForgotPasswordDto, LoginUserDto, ResetPasswordDto, UserLoginResponseDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from 'src/util/password-hash.util';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserLoginResponseDto> {
    const user = await this.userService.findUser(loginUserDto.email);
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

  @Post('forgot')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.findUser(forgotPasswordDto.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      statusCode: 200,
      message: 'Forgot password validation successful',
      timestamp: new Date(),
    };
  }

  @Post('reset')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.userService.resetUserPassword(resetPasswordDto.email, resetPasswordDto.password);
    return {
      statusCode: 200,
      message: 'Password reset successful',
      timestamp: new Date(),
    };
  }
}
