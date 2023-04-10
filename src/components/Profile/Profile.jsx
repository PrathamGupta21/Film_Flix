import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const favouriteMovies = [];

  console.log(user);

  const logOut = () => {
    localStorage.clear();

    window.location.href = '/';
  };

  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' gutterBottom>
          My Profile - {user.username}
        </Typography>
        <Button color='inherit' onClick={logOut}>
          LogOut &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favouriteMovies.length ? (
        <Typography variant='h5'>
          Add Favourites or Watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>Fav Movies</Box>
      )}
    </Box>
  );
};

export default Profile;
