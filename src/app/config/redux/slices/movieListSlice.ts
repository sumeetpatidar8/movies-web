import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

interface MovieList {
    "Title": string,
    "Year": string,
    "imdbID": string,
    "Type": string,
    "Poster": string;
}

const dataAdapter = createEntityAdapter<MovieList>( {
    selectId: ( movie ) => movie.imdbID,
    sortComparer: ( a, b ) => a.Title.localeCompare( b.Title ),
} );

export const fetchData = createAsyncThunk( 'data/fetchData', async ( { type, title }: any ) => {
    try {
        const response = await fetch( `https://www.omdbapi.com/?type=${ type }&s=${ title }&apikey=7d7ed07a` );
        const data = await response.json();
        if ( data.Response === 'False' ) {
            throw new Error( data.Error );
        }
        return data.Search;
    } catch ( error ) {
        return isRejectedWithValue( error );
    }
} );

export interface MovieData {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
      Source: string;
      Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

const movieData: MovieData = {
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: "",
    Country: "",
    Awards: "",
    Poster: "",
    Ratings: [
        {Source: "", Value: ""},
    ],
    Metascore: "",
    imdbRating: "",
    imdbVotes: "",
    imdbID: "",
    Type: "",
    DVD: "",
    BoxOffice: "",
    Production: "",
    Website: "",
    Response: "",
  };
  

const combinedInitialState = {
    movieList: {
      ...dataAdapter.getInitialState(),
    },
    singleMovie: movieData,
    status: 'idle',
    error: null,
    rating: ''
  };

export const fetchMultipleSingleData = createAsyncThunk(
    'data/fetchMultipleSingleData',
    async (ids: any) => {
      const detailedDataPromises = ids.map(async (id:any) => {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&plot=short&apikey=7d7ed07a`);
        const data = await response.json();
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }
        return data;
      });
      return Promise.all(detailedDataPromises);
    }
  );
  

const moviedataSlice = createSlice( {
    name: 'data',
    initialState:combinedInitialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder
            .addCase( fetchData.pending, ( state ) => {
                state.status = 'loading';
            } )
            .addCase( fetchData.fulfilled, ( state, action ) => {
                state.status = 'succeeded';
                dataAdapter.setAll( state.movieList, action.payload as MovieList[] );
            } )
            .addCase( fetchData.rejected, ( state: any, action: any ) => {
                state.status = 'failed';
                state.error = action.error.message;
            } )
            .addCase(fetchMultipleSingleData.fulfilled, (state, action) => {
                const serializedData = JSON.stringify(action.payload);
                sessionStorage.setItem('movieData', serializedData);
              });

    },
} );


export default moviedataSlice.reducer;