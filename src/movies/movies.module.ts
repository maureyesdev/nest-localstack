import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesResolver } from './resolvers/movies.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/movies/gql',
    }),
  ],
  providers: [MoviesResolver, MoviesService],
})
export class MoviesModule {}
