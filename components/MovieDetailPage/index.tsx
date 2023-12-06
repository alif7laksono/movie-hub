// components/MovieDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "@/utils/api";
import { MovieDetails } from "@/utils/types";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Make id optional
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const details = await fetchMovieDetails(id);
          setMovieDetails(details);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movieDetails) {
    // Handle loading state or invalid ID
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movieDetails.title}</h2>
      {/* Display other movie details here */}
    </div>
  );
};

export default MovieDetailPage;
