import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesResolver } from './resolvers/movies.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AwsModule } from '../aws/aws.module';
import { SqsService } from '../aws/services/sqs.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/movies/gql',
    }),
    AwsModule,
  ],
  providers: [MoviesResolver, MoviesService, SqsService],
})
export class MoviesModule {}
