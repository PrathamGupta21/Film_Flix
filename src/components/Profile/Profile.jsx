import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: 'watchlist/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    localStorage.clear();

    window.location.href = '/';
  };

  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' gutterBottom>
          My Profile
        </Typography>
        <Button color='inherit' onClick={logOut}>
          LogOut &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant='h5'>
          Add Favorites or Watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title='Favorite Movies' movies={favoriteMovies} />
          <RatedCards title='Watchlist Movies' movies={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
