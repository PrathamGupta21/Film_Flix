import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
  }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //* Get Movies
    getMovies: builder.query({
      query: ({ categoryName, page }) => {
        if (categoryName && typeof categoryName === 'string') {
          return `/movie/${categoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        if (categoryName && typeof categoryName === 'number') {
          return `discover/movie?with_genres=${categoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
