// components/MovieRecommendations.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import {
    MovieDetails,
    MovieImage,
    CastMember,
    TrendingMovie,
  } from "@/utils/types";
import './styles.css'

const MovieRecommendations: React.FC<{ movieRecommendations: any[] }> = ({ movieRecommendations }) => {
  return (
    <div className="recommendations-container">
      <Typography variant="h2" className="recommendations-title">
        Movie Recommendations
      </Typography>
      <div className="recommendations-list">
        {movieRecommendations.map((recommendation) => (
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
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
