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

  getHealth(): string {
    return "I'm okay!";
  }

  postUser(body: User): number{
    console.log(this.users);
    const {username, avatar} = body;
    return this.users.push(new User(username, avatar));
  }

  postTweet(body:any): any{
    const { username, tweet } = body;
    const usuarioCadastrado = this.users.find((user) => user.username === username);
    if (!usuarioCadastrado) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    this.tweets.push(new Tweet(usuarioCadastrado, tweet)) //salva o avatar junto (salva o User como foi requisitado)
    return usuarioCadastrado;
  }

  getTweets(page): any{
    let minPage = undefined;
    let maxPage = -15;
    if(page){
      if(page < 1) throw new HttpException('Select a valid page!', HttpStatus.BAD_REQUEST);
      maxPage = -(page*15);
      minPage = Number(page) ===1 ? undefined : maxPage+15;
    }
    
    const newestTenTweets = this.tweets.reverse().slice(maxPage, minPage); //adicionar aqui limites de múltiplos de 10
    const newestTenTweetsStructure = newestTenTweets.map((t) => ({
      username : t.user.username,
      avatar: t.user.avatar,
      tweet: t.tweet,
       //vai dar erro se o usuário procurado não estiver cadastrado
    }));
    
    return newestTenTweetsStructure; //assim está do mais velho para o mais novo
  }

  getUserTweets(username: string): any{
    const tweetsUser = this.tweets.reverse().filter(tweet=>tweet.user.username===username);
    const tweetsUserStructure = tweetsUser.map((t) => ({
      username : t.user.username,
      avatar: t.user.avatar,
      tweet: t.tweet,
    }));
    return tweetsUserStructure;
  }
}
