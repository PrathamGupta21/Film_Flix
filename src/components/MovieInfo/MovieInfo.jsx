import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Modal,
  Rating,
  Typography,
} from '@mui/material';
import {
  ArrowBack,
  Favorite,
  FavoriteBorderOutlined,
  Language,
  Movie as MovieIcon,
  PlusOne,
  Remove,
  Theaters,
} from '@mui/icons-material';

import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectCategory } from '../../features/currentCategory';
import MovieList from './../MovieList/MovieList';

const MovieInfo = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const [open, setOpen] = useState(false);

  const { data: recommendations } = useGetRecommendationsQuery({
    list: '/recommendations',
    movie_id: id,
  });

  const isMovieFavorited = true;
  const isMovieWatchListed = true;

  const addToFavourites = () => {};

  const addToWatchList = () => {};

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to='/'>Something went wrong - Go Back</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction='column' lg={7}>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title} {data.release_date.split('-')[0]}
        </Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display='flex' alignContent='center'>
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant='subtitle1'
              gutterBottom
              style={{ marginLeft: '10px' }}>
              {Math.round(data?.vote_average * 10) / 10} / 10
            </Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime} Minutes/{' '}
            {data?.spoken_languages.length > 0
              ? data?.spoken_languages[0].name
              : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to='/'
              onClick={() => dispatch(selectCategory(genre.id))}>
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt='Genres'
                className={classes.genreImage}
                height={30}
              />
              <Typography color='textPrimary' variant='subtitle1'>
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant='h5' gutterBottom style={{ marginTop: '15px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant='h5' gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: 'none' }}>
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color='textPrimary'>
                        {character?.name}
                      </Typography>
                      <Typography color='textSecondary'>
                        {character?.character.split('/')[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size='medium' variant='outlined'>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={data?.homepage}
                  endIcon={<Language />}>
                  Website
                </Button>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href='#'
                  endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size='medium' variant='outlined'>
                <Button
                  onClick={addToFavourites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}>
                  <Typography
                    style={{ textDecoration: 'none' }}
                    component={Link}
                    to='/'
                    color='inherit'
                    variant='subtitle2'>
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}>
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            title='Trailer'
            src={`https:/www.youtube.com/embed/${data.videos.results[0].key}`}
            allow='autoplay'
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInfo;
