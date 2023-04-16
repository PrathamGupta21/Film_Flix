import React from 'react';
import { Button, Typography } from '@mui/material';

import useStyles from './styles';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const { classes } = useStyles();

  const handlePrev = () => {
    if (currentPage !== 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (currentPage !== totalPages) setPage((prevPage) => prevPage + 1);
  };

  if (totalPages === 0) return null;

  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        onClick={handlePrev}
        disabled={currentPage === 1}
        variant='contained'
        color='primary'
        type='button'>
        Prev
      </Button>
      <Typography variant='h4' className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        className={classes.button}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        variant='contained'
        color='primary'
        type='button'>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
