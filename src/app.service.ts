import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor(){
    this.users = []; //é necessário?
    this.tweets = [];
  }

  getHello(): string {
    return 'Hello World!';
  }

  postUser(body: User): number{
    console.log(this.users);
    const {username, avatar} = body;
    return this.users.push(new User(username, avatar));
  }

  postTweet(username: string, body:any): any{
    const { tweet } = body;
    const usuarioCadastrado = this.users.find((user) => user.username === username);
    if (!usuarioCadastrado) throw new Error();
    this.tweets.push(new Tweet(usuarioCadastrado, tweet)) //salva o avatar junto (salva o User como foi requisitado)
    return usuarioCadastrado;
  }
}
