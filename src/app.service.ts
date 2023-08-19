import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  private users: User[];

  constructor(){
    this.users = []; //é necessário?
  }

  getHello(): string {
    return 'Hello World!';
  }

  postUser(body: User): number{
    console.log(this.users);
    const {username, avatar} = body;
    return this.users.push(new User(username, avatar));
  }
}
