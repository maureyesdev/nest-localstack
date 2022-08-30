import { Injectable } from '@nestjs/common';
import { CreateMovieInput } from '../dto/create-movie.input';
import { UpdateMovieInput } from '../dto/update-movie.input';
import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {
  private readonly movies: Movie[] = [
    { id: 1, title: 'The Shaw shank Redemption' },
    { id: 2, title: 'The Godfather' },
    { id: 3, title: 'The Godfather: Part II' },
  ];

  async createOne(movieInput: CreateMovieInput) {
    return new Promise((resolve) => {
      const movie: Movie = {
        id: Math.floor(Math.random() * 1000) + 1,
        title: movieInput.title,
      };
      this.movies.push(movie);
      resolve(movie);
    });
  }

  async getMany() {
    return new Promise((resolve) => resolve(this.movies));
  }

  async getOne(id: number) {
    return new Promise((resolve) =>
      resolve(this.movies.find((movie) => movie.id === id)),
    );
  }

  updateOne(id: number, updateMovieInput: UpdateMovieInput) {
    return new Promise((resolve) => {
      const movie = this.movies.find((movie) => movie.id === id);
      movie.title = updateMovieInput.title;
      // replace the movie in this.movie with the updated movie
      this.movies.splice(this.movies.indexOf(movie), 1, movie);
      resolve(movie);
    });
  }

  deleteOne(id: number) {
    return new Promise((resolve) => {
      const movie = this.movies.find((movie) => movie.id === id);
      this.movies.splice(this.movies.indexOf(movie), 1);
      resolve(movie);
    });
  }
}
