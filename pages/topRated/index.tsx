// PopularMovieList.tsx
"use client";
import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/utils/api";
import Heder from '@/components/Header'
import Link from "next/link";
import "./styles.css";

interface PopularMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const PopularMovieCard: React.FC<{ movie: PopularMovie }> = ({ movie }) => {
  return (
    <div className="movieCard">
      <Link key={movie.id} href={`/movie/${movie.id}`} className="link">
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title}
          className="movieImage"
        />
        <h3 className="top-title">{movie.title}</h3>
      </Link>
      <p className="releaseDate">{movie.release_date}</p>
    </div>
  );
};

const PopularMovieList: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<PopularMovie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMoviesData = await getTopRatedMovies();
        setPopularMovies(popularMoviesData);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <>
    <Heder />
      <div className="imageScrollerContainer">
        <div className="imageScroller">
          {popularMovies.map((movie) => (
            <PopularMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularMovieList;
