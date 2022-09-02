import { Module } from '@nestjs/common';
import { LambdaService } from './services/lambda.service';
import { SqsService } from './services/sqs.service';

@Module({
  providers: [LambdaService, SqsService],
  exports: [SqsService],
})
export class AwsModule {}
