import React from 'react';
import { Link } from 'react-router-dom';
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const demoCategories = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];

const redLogo =
  'https://fontmeme.com/permalink/230408/f12eb3d578abb48b3e7b88f34f9998c8.png';
const blueLogo =
  'https://fontmeme.com/permalink/230408/d1c049b7518cbffa098f08febd8002a9.png';

const SideBar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const { classes } = useStyles();

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
            <ListItemButton onClick={() => {}}>
              <ListItemIcon>
                <img
                  src={redLogo}
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
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to='/'>
            <ListItemButton onClick={() => {}}>
              <ListItemIcon>
                <img
                  src={redLogo}
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
    </>
  );
};

export default SideBar;
