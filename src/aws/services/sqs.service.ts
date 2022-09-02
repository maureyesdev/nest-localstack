import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

export interface MessageBody {
  jobType: 'event';
  payload?: any;
}

export interface SqsSendMessageOpts {
  MessageBody: MessageBody;
}

@Injectable()
export class SqsService {
  async sendMessage(args: SqsSendMessageOpts): Promise<boolean> {
    const sqsService = new AWS.SQS({ region: 'us-east-1' });
    const QUEUE_URL =
      'http://localhost:4566/000000000000/mau-micro-services-local-movies-queue';
    const params: AWS.SQS.SendMessageRequest = {
      QueueUrl: QUEUE_URL,
      MessageBody: JSON.stringify(args.MessageBody),
    };
    return await new Promise((resolve) => {
      return sqsService.sendMessage(params, (err, data) => {
        if (err) {
          console.log('sqs error', err);
          return resolve(false);
        }

        console.log('sqs result', data);
        resolve(true);
      });
    });
  }
}
