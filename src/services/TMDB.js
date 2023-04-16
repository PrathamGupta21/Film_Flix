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
        return `/movie/top_rated?page=${page}&api_key=${tmdbApiKey}&with_original_language=hi|kn|ml|ta|te`;
      },
    }),

    //* Get Movie By ID
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    //* Get User Specific List
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),

    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),

    //* Get Actors Detail
    getActorsDetail: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
    }),

    //* Get Movies By Actor
    getMoviesByActorId: builder.query({
      query: (id, page) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
