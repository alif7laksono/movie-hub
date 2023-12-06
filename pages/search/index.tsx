// pages/search.tsx
import React, { useEffect, useState } from "react";
import {
  searchMoviesByTitle,
  getMovieCategories,
  getMoviesByCategory,
  getAllMovies,
} from "@/utils/api";
import { SearchResult, MovieCategory } from "@/utils/types";
import SearchResults from "@/components/SearchResults";
import { TextField, Typography, Button } from "@mui/material";
import "./styles.css";

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [movieCategories, setMovieCategories] = useState<MovieCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [visibleResults, setVisibleResults] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all movies
        const allMovies = await getAllMovies();
        setSearchResults(allMovies);

        // Fetch movie categories
        const categories = await getMovieCategories();
        setMovieCategories(categories);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchData();
  }, []);

  const searchMoviesByTitleAndCategory = async (title: string, categoryId: number) => {
    // Fetch all movies in the selected category
    const allMoviesInCategory = await getMoviesByCategory(categoryId);
  
    // Filter the movies by title
    const filteredMovies = allMoviesInCategory.filter(movie =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  
    return filteredMovies;
  };

  const handleSearch = async () => {
    try {
      // If a category is selected, fetch movies by category
      if (selectedCategory !== null) {
        if (searchQuery.trim() === "") {
          // If there's no search query and a category is selected,
          // fetch all movies in the selected category.
          const results = await getMoviesByCategory(selectedCategory);
          setSearchResults(results);
        } else {
          // If there's a search query and a category is selected,
          // perform a search by title within the selected category.
          const results = await searchMoviesByTitleAndCategory(searchQuery, selectedCategory);
          setSearchResults(results);
        }
      } else {
        // If no category is selected, perform a regular search by title
        if (searchQuery.trim() === "") {
          // If there's no search query and no category selected,
          // you might want to handle this case accordingly.
          // For example, display a message or show popular movies.
          console.log("No search query or category selected");
          return;
        }
  
        // If there's a search query, perform a regular search by title
        const results = await searchMoviesByTitle(searchQuery);
        setSearchResults(results);
      }
  
      // Reset the visible results when performing a new search
      setVisibleResults(20);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  const handleCategoryClick = async (categoryId: number) => {
    // Set the selected category
    setSelectedCategory(categoryId);

    try {
      const results = await getMoviesByCategory(categoryId);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching movies by category:", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleResults((prevVisibleResults) => prevVisibleResults + 20);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="search-page">
        <TextField
          type="text"
          placeholder="Search Movies"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
        />

        <div className="movie-categories">
          <ul>
            {movieCategories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <SearchResults results={searchResults.slice(0, visibleResults)} />
        {visibleResults < searchResults.length && (
          <Button
            onClick={handleLoadMore}
            variant="outlined"
            className="load-more-button"
          >
            Load More
          </Button>
        )}

        {searchResults.length === 0 && (
          <Typography variant="body1">No results found.</Typography>
        )}

      </div>
    </>
  );
};

export default SearchPage;
