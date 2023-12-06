// PopularMovieList.tsx
"use client";
import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/utils/api";
import Link from "next/link";
import "./styles.css";

interface NowPlayingMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const NowPlaying: React.FC<{ movie: NowPlayingMovie }> = ({ movie }) => {
  return (
    <div className="movieCard">
      <Link key={movie.id} href={`/movie/${movie.id}`} target="_blank">
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title}
          className="movieImage"
        />
        <h3>{movie.title}</h3>
      </Link>
      <p className="releaseDate">Release Date: {movie.release_date}</p>
    </div>
  );
};

const PopularMovieList: React.FC = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<NowPlayingMovie[]>(
    []
  );

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const nowPlayingMoviesData = await getNowPlayingMovies();
        setNowPlayingMovies(nowPlayingMoviesData);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  return (
    <div className="imageScrollerContainer">
      <div className="imageScroller">
        {nowPlayingMovies.map((movie) => (
          <NowPlaying key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovieList;
