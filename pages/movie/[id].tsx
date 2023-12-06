// pages/movie/[id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  fetchMovieDetails,
  fetchMovieImages,
  fetchMovieCast,
  fetchMovieRecommendations,
  fetchMovieTrailers,
} from "@/utils/api";
import {
  MovieDetails,
  MovieImage,
  CastMember,
  TrendingMovie,
} from "@/utils/types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Header from "@/components/Header";
import Link from "next/link";
import "./style.css";

const MovieDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [movieImages, setMovieImages] = useState<MovieImage[]>([]);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [visibleImages, setVisibleImages] = useState(8);
  const [visibleCast, setVisibleCast] = useState(4);
  const [movieRecommendations, setMovieRecommendations] = useState<
    TrendingMovie[]
  >([]);
  const [movieTrailers, setMovieTrailers] = useState<string[]>([]);
  const limitedImages = movieImages.slice(0, visibleImages);
  const limitedCast = cast.slice(0, visibleCast);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // Fetch movie details
          const details = await fetchMovieDetails(String(id));
          setMovieDetails(details);

          // Fetch movie images
          const images = await fetchMovieImages(String(id));
          setMovieImages(images);

          // Fetch movie cast
          const castMembers = await fetchMovieCast(String(id));
          setCast(castMembers);

          // Fetch movie recommendations
          const recommendations = await fetchMovieRecommendations(String(id));
          setMovieRecommendations(recommendations);

          // Fetch movie trailers
          const trailers = await fetchMovieTrailers(String(id));
          setMovieTrailers(trailers);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="movie-details">
        <div className="left-column">
          {movieDetails.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="poster-image"
            />
          )}
        </div>

        {/* Right Column - Movie Details */}
        <div className="right-column">
          <Typography variant="h3" className="movie-title">
            {movieDetails.title}
          </Typography>
          <Typography variant="body1" className="release-date">
            {movieDetails.release_date}
          </Typography>
          <Typography variant="body1" className="overview">
            {movieDetails.overview}
          </Typography>
          <Typography variant="body1" className="bold-text">
            <span className="bold-label">Genres:</span>{" "}
            {movieDetails.genres.join(", ")}
          </Typography>
          <Typography variant="body1" className="bold-text">
            <span className="bold-label">Runtime:</span> {movieDetails.runtime}{" "}
            minutes
          </Typography>
          <Typography variant="body1" className="bold-text">
            <span className="bold-label">Language:</span>{" "}
            {movieDetails.original_language}
          </Typography>
          <Typography variant="body1" className="vote-average">
            Vote Average: {movieDetails.vote_average}
          </Typography>
          <Typography variant="body1" className="production-companies">
            Production Companies: {movieDetails.production_companies.join(", ")}
          </Typography>

          <div className="images-container">
            {limitedImages.map((image) => (
              <Card key={image.file_path} className="movie-image">
                <CardMedia
                  component="img"
                  alt={movieDetails.title}
                  className="image-content"
                  src={`https://image.tmdb.org/t/p/w300/${image.file_path}`}
                />
              </Card>
            ))}
          </div>

          <div className="cast-container">
            <ul className="cast-list">
              {limitedCast.map((castMember) => (
                <li key={castMember.id}>
                  <div className="cast-member">
                    {castMember.profile_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w100/${castMember.profile_path}`}
                        alt={castMember.name}
                        className="cast-member-image"
                      />
                    )}
                    <Typography variant="body1" className="cast-member-name">
                      {castMember.name}
                    </Typography>
                    <p className="cast-character">{castMember.character}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="trailers-container">
          {movieTrailers.length > 0 && (
            <Typography variant="h2" className="trailers-title">
              Trailers
            </Typography>
          )}
          <div className="trailers-list">
            {movieTrailers.map((trailer, index) => (
              <div key={index} className="trailer-item">
                <iframe
                  title={`trailer-${index}`}
                  width="560"
                  height="315"
                  src={trailer}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>

        <Typography variant="h3" className="recommendations-title">
          Recommendations
        </Typography>
        <div className="recommendations-container">
          <div className="recommendations-list">
            {movieRecommendations.map((recommendation) => (
              <Link
                key={recommendation.id}
                href={`/movie/${recommendation.id}`} // Update the href here
                passHref
                className="recommendation-link"
                target="_blank"
              >
                <div key={recommendation.id} className="recommendation-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${recommendation.poster_path}`}
                    alt={recommendation.title}
                    className="recommendation-image"
                  />
                  <Typography variant="body1" className="recommendation-title">
                    {recommendation.title}
                  </Typography>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailPage;
