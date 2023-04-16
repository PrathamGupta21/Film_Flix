import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import MovieList from '../MovieList/MovieList';
import { useGetMoviesQuery } from '../../services/TMDB';
import Pagination from '../Pagination/Pagination';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { categoryName, searchQuery } = useSelector(
    (state) => state.currentCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    categoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display='flex' alignContent='center' mt='20px'>
        <Typography variant='h4'>No Movies Found</Typography>
      </Box>
    );
  }

  if (error) return 'An error has occured.';

  return (
    <div>
      <MovieList movies={data} />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPage={data?.total_pages}
      />
    </div>
  );
};

export default Movies;
