import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UserLoginResponseDto } from './dto/user.dto';
import { MongoService } from 'src/database/mongodb';
import { Databaselist, SystemCollection } from 'src/config/db.config';
import { checkPassword, hashPassword } from 'src/util/password-hash.util';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly mongoService: MongoService,
    private jwtService: JwtService,
  ) {}
  public async createUser(createUserDto: CreateUserDto): Promise<void> {
    const userExists = await this.mongoService.find<User>(Databaselist.SYSTEM, SystemCollection.USERS, {
      email: createUserDto.email,
    });

    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    await this.mongoService.insert(Databaselist.SYSTEM, SystemCollection.USERS, createUserDto);
  }

  public async checkUser(loginUserDto: LoginUserDto): Promise<UserLoginResponseDto> {
    const user = await this.mongoService.find<User>(Databaselist.SYSTEM, SystemCollection.USERS, {
      email: loginUserDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordMatch = await checkPassword(loginUserDto.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.signAsync({ email: user.email });
    return { token };
  }
}
