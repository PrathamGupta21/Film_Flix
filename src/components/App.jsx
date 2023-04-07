import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';

import useStyles from './styles';

import Actors from './Actors/Actors';
import MovieInfo from './MovieInfo/MovieInfo';
import Movies from './Movies/Movies';
import NavBar from './NavBar/NavBar';
import Profile from './Profile/Profile';

const App = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/movie/:id' element={<MovieInfo />} />
          <Route path='/actors/:id' element={<Actors />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
