import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => {
  return {
    moviesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      overflow: 'auto',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
  };
});
