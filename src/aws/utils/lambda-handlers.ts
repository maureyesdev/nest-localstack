import { Handler } from 'aws-lambda';
import { MoviesModule } from '../../movies/movies.module';
import { LambdaService } from '../services/lambda.service';

export const moviesService: Handler = new LambdaService({
  module: MoviesModule,
}).handler;

export const moviesJobs = new LambdaService({
  module: MoviesModule,
}).job;
