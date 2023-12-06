// MovieList/index.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./styles.css";
import { getAllMovies } from "@/utils/api";
import { Movie } from "@/utils/types";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch all movies
        const allMovies = await getAllMovies();
        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Initial fetch when the component mounts
    fetchMovies();
  }, []);

  return (
    <div className="">
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} target="_blank">
              <div className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
