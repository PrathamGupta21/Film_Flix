import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectCategory } from '../../features/currentCategory';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const redLogo =
  'https://fontmeme.com/permalink/230408/f12eb3d578abb48b3e7b88f34f9998c8.png';
const blueLogo =
  'https://fontmeme.com/permalink/230408/d1c049b7518cbffa098f08febd8002a9.png';

const SideBar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const { classes } = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const { categoryName } = useSelector((state) => state.currentCategory);

  useEffect(() => {
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  return (
    <>
      <Link to='/' className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt='FilmFlix Logo'
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to='/'>
            <ListItemButton onClick={() => dispatch(selectCategory(value))}>
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  alt='Genres'
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display='flex' justifyContent='center'>
            <CircularProgress size='4rem' />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={id} className={classes.links} to='/'>
              <ListItemButton onClick={() => dispatch(selectCategory(id))}>
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    alt='Genres'
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default SideBar;
