// components/TrendingMovieList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

interface TrendingMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  rating: number;
}

interface TrendingMovieListProps {
  movies: TrendingMovie[];
}

const TrendingMovieList: React.FC<TrendingMovieListProps> = ({ movies }) => {
  return (
    <div className="trending-movie-list">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <div className="trending-movie">
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
              className="movieImage"
            />
            <div className="movieDetails">
              <h3 className="movieTitle">{movie.title}</h3>
              <p>{movie.release_date}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TrendingMovieList;
