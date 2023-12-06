// components/SearchResults/index.tsx
import React, { useState } from "react";
import { SearchResult } from "@/utils/types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import MovieDetailPopup from "@/components/MovieDetailPopUp";
import "./styles.css";

const SearchResults: React.FC<{ results: SearchResult[] }> = ({ results }) => {
  const [visibleResults, setVisibleResults] = useState(20);
  const [selectedMovie, setSelectedMovie] = useState<SearchResult | null>(null);

  const loadMoreResults = () => {
    setVisibleResults((prevVisibleResults) => prevVisibleResults + 20);
  };

  const handleMovieClick = (movie: SearchResult) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetail = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="search-results">
      {results.slice(0, visibleResults).map((result) => (
        <div
          key={result.id}
          className="search-result-item"
          onClick={() => handleMovieClick(result)}
        >
          <Card>
            <CardMedia
              component="img"
              alt={result.title}
              height="140"
              image={`https://image.tmdb.org/t/p/w300/${result.poster_path}`}
            />
            <CardContent>
              <Typography variant="h6" className="result-title">
                {result.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="result-overview"
              >
                {result.overview}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
      {visibleResults < results.length && (
        <Button
          onClick={loadMoreResults}
          variant="outlined"
          className="load-more-button"
        >
          Load More
        </Button>
      )}

      {/* Movie Detail Popup */}
      {selectedMovie && (
        <MovieDetailPopup
          isOpen={!!selectedMovie}
          onClose={closeMovieDetail}
          movie={selectedMovie}
        />
      )}
    </div>
  );
};

export default SearchResults;
