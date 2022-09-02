import { INestApplication, Injectable } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import { MoviesModule } from '../../movies/movies.module';

interface LambdaServiceOptions {
  module?: any;
}

// * If this is going to be used as part of a dependency injection uncomment
// @Injectable()
export class LambdaService {
  private server: Handler;
  private module: any;
  private nestApp: INestApplication;

  constructor(opts?: LambdaServiceOptions) {
    this.module = opts?.module;
  }

  private async bootstrap() {
    const app = await NestFactory.create(this.module);
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
  }

  handler = async (event: any, context: Context, callback: Callback) => {
    this.server = this.server ?? (await this.bootstrap());
    return this.server(event, context, callback);
  };

  job = async (event: any, context: Context, callback: Callback) => {
    if (!this.nestApp) {
      const app = await NestFactory.create(this.module);
      await app.init();
      this.nestApp = app.getHttpAdapter().getInstance();
    }

    console.log('🚀 ~ event', event);
  };
}
