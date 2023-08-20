import { BadRequestException, Body, Controller, Get, Headers, HttpCode, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateTweetDto } from './dtos/create-tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @HttpCode(200)
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post("/sign-up")
  @HttpCode(200)
  postUser(@Body() body:CreateUserDto): number {
    return this.appService.postUser(body);
  }

  @Post("/tweets")
  postTweet(@Body() body:CreateTweetDto): any {
    return this.appService.postTweet(body);
  }

  @Get("/tweets")
  @HttpCode(200)
  getTweets(@Query('page') page: string): any {
    return this.appService.getTweets(page);
  }

  @Get("/tweets/:username")
  @HttpCode(200)
  getUserTweets(@Param('username') username: string): any {
    return this.appService.getUserTweets(username);
  }
}
