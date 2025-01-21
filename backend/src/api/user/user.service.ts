import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { MongoService } from 'src/database/mongodb';
import { Databaselist, SystemCollection } from 'src/config/db.config';
import { hashPassword } from 'src/util/password-hash.util';
import { User } from './schema/user.schema';
import { RedisService } from 'src/database/redis';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    private readonly mongoService: MongoService,
    private readonly redisService: RedisService,
  ) {}
  public async createUser(createUserDto: CreateUserDto): Promise<void> {
    const userExists = await this.mongoService.find<User>(Databaselist.SYSTEM, SystemCollection.USERS, {
      email: createUserDto.email,
    });

    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await hashPassword(createUserDto.password);
    const newUser: User = {
      _id: new ObjectId(),
      email: createUserDto.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.mongoService.insert<User>(Databaselist.SYSTEM, SystemCollection.USERS, newUser);
  }

  public async findUser(loginUserDto: LoginUserDto): Promise<User> {
    const userInMemory = await this.redisService.get<User>(`${SystemCollection.USERS}:${loginUserDto.email}`);
    if (userInMemory) {
      return userInMemory;
    }
    const user = await this.mongoService.find<User>(Databaselist.SYSTEM, SystemCollection.USERS, {
      email: loginUserDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    await this.redisService.set(`${SystemCollection.USERS}:${loginUserDto.email}`, user);
    return user;
  }
}
