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
      query: ({ categoryName, page, searchQuery }) => {
        //* Get Movie by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get Movies by Categories
        if (categoryName && typeof categoryName === 'string') {
          return `/movie/${categoryName}?page=${page}&api_key=${tmdbApiKey}&with_original_language=hi|kn|ml|ta|te`;
        }

        //* Get Movies by Genre
        if (categoryName && typeof categoryName === 'number') {
          return `discover/movie?with_genres=${categoryName}&page=${page}&api_key=${tmdbApiKey}&with_original_language=hi|kn|ml|ta|te`;
        }

        //* Get Default Movies
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}&with_original_language=hi|kn|ml|ta|te`;
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
