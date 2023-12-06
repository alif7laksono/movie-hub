"use client";
import Link from "next/link";
import "./globals.css";
import MovieList from "@/components/MovieList";
import TopRated from "@/components/TopRated";
import NowPlaying from "@/components/NowPlaying";

export default function Home() {
  return (
    <div className="container">
      <Link href="/" className="navLink" target="_blank">Movies</Link>
      <MovieList />
      <Link href="/topRated" className="navLink" target="_blank">Top Rated</Link>
      <TopRated />
      <Link href="/nowplaying" className="navLink" target="_blank">Now Playing</Link>
      <NowPlaying />
      {/* <Search /> */}
    </div>
  );
}
