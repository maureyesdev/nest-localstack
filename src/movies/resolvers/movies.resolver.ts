import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';
import { CreateMovieInput } from '../dto/create-movie.input';
import { UpdateMovieInput } from '../dto/update-movie.input';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => Movie)
  createMovie(@Args('input') movieInput: CreateMovieInput) {
    return this.moviesService.createOne(movieInput);
  }

  @Query(() => [Movie], { name: 'movies' })
  getMovies() {
    return this.moviesService.getMany();
  }

  @Query(() => Movie, { name: 'movie' })
  getMovie(@Args('id', { type: () => Int }) id: number) {
    return this.moviesService.getOne(id);
  }

  @Mutation(() => Boolean)
  sendMoviesJob() {
    return this.moviesService.setMovieJob();
  }
}
