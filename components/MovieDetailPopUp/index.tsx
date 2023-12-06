// components/MovieDetailPopup.tsx
import React, { useEffect, useState } from "react";
import {
  SearchResult,
  MovieDetailPopupProps,
  MovieDetails,
  CastMember,
  TrendingMovie,
} from "@/utils/types";
import {
  fetchMovieTrailers,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieRecommendations, // Add this import
} from "@/utils/api";
import { Dialog, DialogContent, Typography } from "@mui/material";
import YouTube from "react-youtube";
import "./styles.css";
import {
  FaCalendarAlt,
  FaFilm,
  FaClock,
  FaLanguage,
  FaStar,
} from "react-icons/fa";

const MovieDetailPopup: React.FC<MovieDetailPopupProps> = ({
  isOpen,
  onClose,
  movie,
}) => {
  const youtubeOptions = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const [trailers, setTrailers] = useState<string[]>([]);
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [recommendations, setRecommendations] = useState<TrendingMovie[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<TrendingMovie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (movie) {
        try {
          // Fetch trailers
          const trailers = await fetchMovieTrailers(String(movie.id));
          setTrailers(trailers);

          // Fetch movie details
          const details = await fetchMovieDetails(String(movie.id));
          setDetails(details);

          // Fetch movie cast
          const cast = await fetchMovieCast(String(movie.id));
          setCast(cast);

          // Fetch movie recommendations
          const movieRecommendations = await fetchMovieRecommendations(
            String(movie.id)
          );
          setRecommendations(movieRecommendations);
        } catch (error) {
          console.error("Error fetching movie data:", error);
        }
      }
    };

    fetchData();
  }, [movie]);

  if (!movie || !details) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent className="dialog-content">
        <div className="movie-body">
          <div className="movie-left">
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
          </div>

          <div className="movie-right">
            <div className="movie-header">
              <Typography className="movie-title" variant="h4">
                {movie.title}
              </Typography>
            </div>
            <Typography variant="body2" className="movie-overview">
              {details.overview}
            </Typography>
            <div className="info-detail">
              <div className="info-row">
                <Typography variant="body1" className="info-icon">
                  <FaCalendarAlt /> {details.release_date}
                </Typography>
                <Typography variant="body1" className="info-icon">
                  <FaFilm />{" "}
                  {details.genres.map((genre) => genre.name).join(", ")}
                </Typography>
              </div>
              <div className="info-row">
                <Typography variant="body1" className="info-icon">
                  <FaClock /> {details.runtime} mins
                </Typography>
                <Typography variant="body1" className="info-icon">
                  <FaLanguage /> {details.original_language}
                </Typography>
                <Typography variant="body1" className="info-icon">
                  <FaStar /> Vote: {details.vote_average}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="popup-movie-trailers">
          <Typography variant="h6">Trailers:</Typography>
          {trailers.length > 0 ? (
            <ul>
              {trailers.map((trailer, index) => (
                <div key={index} className="youtube-container">
                  <YouTube videoId={trailer} opts={youtubeOptions} />
                </div>
              ))}
            </ul>
          ) : (
            <Typography variant="body2">No trailers available.</Typography>
          )}
        </div>

        <div className="popup-movie-cast">
          <Typography variant="h6" className="cast-title">
            Cast
          </Typography>
          <ul>
            {cast.slice(0, 7).map((member) => (
              <li key={member.id} className="cast-member">
                {member.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${member.profile_path}`}
                    alt={`${member.name} profile`}
                    className="cast-member-image"
                  />
                )}
                <div className="cast-member-details">
                  <Typography variant="subtitle1" className="actor-name">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" className="actor-character">
                    {member.character}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="movie-recommendations">
          <Typography variant="h6">Recommendations:</Typography>
          {recommendations.length > 0 ? (
            <ul>
              {recommendations.slice(0, 7).map((recommendation) => (
                <li
                  key={recommendation.id}
                  onClick={() => setSelectedRecommendation(recommendation)} // Set selected movie recommendation on click
                >
                  {recommendation.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${recommendation.poster_path}`}
                      alt={`${recommendation.title} poster`}
                    />
                  )}
                  <Typography className="movie-title">
                    {recommendation.title}
                  </Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2">
              No recommendations available.
            </Typography>
          )}
        </div>

        {selectedRecommendation && (
          <MovieDetailPopup
            isOpen={!!selectedRecommendation}
            onClose={() => setSelectedRecommendation(null)}
            movie={selectedRecommendation}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailPopup;
