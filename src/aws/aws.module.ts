import { Module } from '@nestjs/common';
import { LambdaService } from './services/lambda.service';

@Module({
  providers: [LambdaService]
})
export class AwsModule {}
