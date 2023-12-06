import axios from "axios";
import {
  MovieDetails,
  TrendingMovie,
  MovieImage,
  CastMember,
  MovieCategory,
  MovieTrailers,
} from "./types";

const apiKey = "8957b6d6390e6fbaf9584037a69afa4e";
const tmdbBaseUrl = "https://api.themoviedb.org/3";

export const fetchMovieImages = async (
  movieId: string
): Promise<MovieImage[]> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`
    );

    return response.data.backdrops; // Adjust based on the API response structure
  } catch (error) {
    console.error("Error fetching movie images:", error);
    return [];
  }
};

export const fetchMovieCast = async (
  movieId: string
): Promise<CastMember[]> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
    );

    return response.data.cast; // Adjust based on the API response structure
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    return [];
  }
};

export const getMovieCategories = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching movie categories:", error);
    throw error;
  }
};

export const getMoviesByCategory = async (categoryId: number) => {
  try {
    const response = await axios.get(`${tmdbBaseUrl}/discover/movie`, {
      params: {
        api_key: apiKey,
        with_genres: categoryId,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by category:", error);
    return [];
  }
};

export const searchMoviesByTitle = async (title: string) => {
  // Panggil API TMDb untuk melakukan pencarian berdasarkan judul
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      title
    )}`
  );
  const data = await response.json();

  // Return hasil pencarian
  return data.results;
};

export const searchMoviesByCast = async (castName: string) => {
  try {
    // Search for a person (cast) by name
    const personResponse = await fetch(
      `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(
        castName
      )}`
    );
    const personData = await personResponse.json();

    // Get the person's ID from the search results
    const personId = personData.results[0]?.id;

    if (personId) {
      // Fetch movies associated with the person (cast) using their ID
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${apiKey}`
      );
      const movieData = await movieResponse.json();

      // Return the movies associated with the cast
      return movieData.cast;
    } else {
      // Handle the case when the person is not found
      return [];
    }
  } catch (error) {
    console.error("Error searching movies by cast:", error);
    return [];
  }
};

export const getAllMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching all movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (
  id: string | string[]
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();

    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      release_date: data.release_date,
      genres: data.genres,
      vote_average: data.vote_average,
      runtime: data.runtime,
      original_language: data.original_language,
      production_companies: data.production_companies,
      origin_country:
        data.production_countries.length > 0
          ? data.production_countries[0].iso_3166_1
          : "",
      poster_path: data.poster_path,
    };
  } catch (error) {
    throw new Error("Error fetching movie details");
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week",
      {
        params: {
          api_key: apiKey,
        },
      }
    );

    // Extract relevant movie details (image, title, release date, rating)
    const trendingMovies: TrendingMovie[] = response.data.results.map(
      (movie: any) => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        rating: movie.rating, // Add the rating property
      })
    );

    return trendingMovies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};

export const getNowPlayingMovies = async (): Promise<MovieDetails[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch now playing movies");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error in getNowPlayingMovies:", error);
    throw error;
  }
};

export const getUpcomingMovies = async (): Promise<MovieDetails[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch upcoming movies");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error in getUpcomingMovies:", error);
    throw error;
  }
};

export const getPopularMovies = async (): Promise<MovieDetails[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error in getPopularMovies:", error);
    throw error;
  }
};

export const getAllGenres = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const fetchMovieRecommendations = async (
  movieId: string
): Promise<TrendingMovie[]> => {
  try {
    const response = await axios.get(
      `${tmdbBaseUrl}/movie/${movieId}/recommendations?api_key=${apiKey}`
    );

    return response.data.results; // Adjust based on the API response structure
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    return [];
  }
};

export const fetchMovieTrailers = async (
  movieId: string
): Promise<string[]> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    );

    const trailers = response.data.results
      .filter(
        (video: { type: string; key: string }) => video.type === "Trailer"
      )
      .map(
        (video: { key: string }) =>
          `https://www.youtube.com/watch?v=${video.key}`
      );

    return trailers;
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    return [];
  }
};

// export const fetchMovieTrailers = async (
//   movieId: string
// ): Promise<string[]> => {
//   try {
//     const response = await axios.get(
//       `${tmdbBaseUrl}/movie/${movieId}/videos?api_key=${apiKey}`
//     );

//     const trailers = response.data.results
//       .filter((video: any) => video.type === "Trailer")
//       .map((video: any) => `https://www.youtube.com/watch?v=${video.key}`);

//     return trailers;
//   } catch (error) {
//     console.error("Error fetching movie trailers:", error);
//     return [];
//   }
// };

