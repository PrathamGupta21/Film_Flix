import React from 'react';

import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  const { data } = useGetMoviesQuery();
  console.log(data);
  return <div>Movies</div>;
};

export default Movies;
