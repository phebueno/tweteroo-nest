import { Body, Controller, Get, Headers, HttpCode, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/sign-up")
  @HttpCode(200)
  postUser(@Body() body:User): number {
    return this.appService.postUser(body);
  }

  @Post("/tweets")
  @HttpCode(200)
  postTweet(@Headers('user') user: string, @Body() body:any): any {
    return this.appService.postTweet(user, body);
  }

  @Get("/tweets")
  @HttpCode(200)
  getTweets(@Query('page') page: string): any {
    return this.appService.getTweets(page);
  }
}
