// components/TrendingFilter.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { getAllGenres } from '@/utils/api';
import './styles.css'

interface Genre {
  id: number;
  name: string;
}

const TrendingFilter: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Default sort order
  const [releaseDateFrom, setReleaseDateFrom] = useState<string>('');
  const [releaseDateTo, setReleaseDateTo] = useState<string>('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const allGenres = await getAllGenres();
        setGenres(allGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };

  const handleReleaseDateFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReleaseDateFrom(event.target.value);
  };

  const handleReleaseDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReleaseDateTo(event.target.value);
  };

  return (
    <div className="trending-filter">
      <p>Filter by:</p>
      <label>
        Sort:
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Title A-Z</option>
          <option value="desc">Title Z-A</option>
        </select>
      </label>
      <label>
        Release Date From:
        <input type="date" value={releaseDateFrom} onChange={handleReleaseDateFromChange} />
      </label>
      <label>
        Release Date To:
        <input type="date" value={releaseDateTo} onChange={handleReleaseDateToChange} />
      </label>
    </div>
  );
};

export default TrendingFilter;
