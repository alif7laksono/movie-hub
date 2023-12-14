// components/Header/index.tsx
"use client";
import { useRouter } from "next/navigation";
import { SearchResult } from "@/utils/types";
import React, { useState } from "react";
import SearchResults from "@/components/SearchResults";
import { searchMoviesByTitle } from "@/utils/api";
import Link from "next/link";

import {
  AiOutlineUser,
  AiOutlineNotification,
  AiOutlineSearch,
} from "react-icons/ai";

import "./styles.css";

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() === "") {
        // Empty search query, do nothing or show a message
        return;
      }

      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      const results = await searchMoviesByTitle(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Listen for Enter key press
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link href="/" className="logo-link">
          TMDB
        </Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Title Movie or Cast"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Link href="/search" target="_blank">
          <AiOutlineSearch size={24} className="icon" />
        </Link>
      </div>

      {searchResults.length > 0 && <SearchResults results={searchResults} />}

      <nav className="nav">
        <ul className="">
          <Link href="/trending" className="link" target="_blank">
            Trending
          </Link>
          <Link href="/" className="link" target="_blank">
            Now Playing
          </Link>
          <Link href="/" className="link" target="_blank">
            Upcoming
          </Link>
          <Link href="/topRated" className="link" target="_blank">
            Top Rated
          </Link>
        </ul>
      </nav>

      <div className="search-container">
        <Link href="/search" target="_blank">
          <AiOutlineSearch size={24} className="icon" />
        </Link>
        <AiOutlineNotification size={24} className="icon" />
      </div>
    </header>
  );
};

export default Header;
