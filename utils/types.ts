// utils.types.ts
export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genres: Array<{ id: number; name: string }>;
  vote_average: number;
  runtime: number;
  original_language: string;
  production_companies: Array<{ id: number; name: string }>;
  origin_country: string;
  poster_path: string;
}

export interface TrendingMovie extends MovieDetails {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  rating: number;
  // Add other relevant movie details
}

export interface MovieImage {
  file_path: string;
  // Add other image details as needed
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export interface SearchResult extends Movie {
  genres: string[];
}

export interface TrendingMovie extends Movie {
  genres: { id: number; name: string }[];
}

export interface SearchResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  runtime: number;
  original_language: string;
  vote_average: number;
  genres: string[];
}

export interface Image {
  file_path: string;
  // Add other properties as needed
}

export interface ImageGalleryProps {
  limitedImages: Image[];
  movieDetails: {
    title: string;
    // Add other properties as needed
  };
}

export interface MovieCategory {
  id: number;
  name: string;
}

export interface MovieDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
}

export interface MovieTrailers {}
