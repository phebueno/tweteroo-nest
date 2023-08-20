import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { error } from 'console';

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
    if (!usuarioCadastrado) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    this.tweets.push(new Tweet(usuarioCadastrado, tweet)) //salva o avatar junto (salva o User como foi requisitado)
    return usuarioCadastrado;
  }

  getTweets(page): any{
    let minPage = undefined;
    let maxPage = -15;
    if(page){
      // inserir erro if(page < 1) res.status(400).send("Informe uma página válida!");
      maxPage = -(page*15);
      minPage = Number(page) ===1 ? undefined : maxPage+15;
    }
    
    const newestTenTweets = this.tweets.slice(maxPage, minPage); //adicionar aqui limites de múltiplos de 10
    const newestTenTweetsStructure = newestTenTweets.map((t) => ({
      username : t.user.username,
      avatar: t.user.avatar,
      tweet: t.tweet,
       //vai dar erro se o usuário procurado não estiver cadastrado
    }));
    
    return newestTenTweetsStructure; //assim está do mais velho para o mais novo
  }
}
