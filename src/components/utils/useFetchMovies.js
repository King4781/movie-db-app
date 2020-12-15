import env from "react-dotenv";
import {
  useReducer,
  useEffect
} from "react";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  MAKE_SEARCH_REQUEST: "make-search-request",
  GET_DATA: "get-data",
  GET_SEARCH_DATA: "get-search-data",
  ERROR: "error",
};

const BASE_URL = "https://api.themoviedb.org/3/movie/";
const BASE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY_LANG = `?api_key=${env.API_KEY}&language=en-US`;

const initialState = {
  movie: {},
  searchResults: [],
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        loading: true,
          movie: {},
          searchResults: [],
      };

    case ACTIONS.MAKE_SEARCH_REQUEST:
      return {
        loading: true,
          movie: {
            ...state.movie
          },
          searchResults: [],
      };

    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
          movie: action.payload.movie,
          searchResults: [],
      };

    case ACTIONS.GET_SEARCH_DATA:
      return {
        ...state,
        movie: {
            ...state.movie
          },
          searchResults: action.payload.results,
          loading: false,
      };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
          error: action.payload.error,
          movie: {},
          searchResults: [],
      };

    default:
      throw new Error("Bad Action Type");
  }
}

export default function useFetchMovies(params, typeOfRequest) {
  let url =
    BASE_SEARCH_URL +
    API_KEY_LANG +
    `&query=${params}&page=1&include_adult=false`;
  let duration = 1000;

  if (typeOfRequest === "getById") {
    url = BASE_URL + params + API_KEY_LANG;
    duration = 0;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeOfRequest === "getById") {
      dispatch({
        type: ACTIONS.MAKE_REQUEST,
      });
    } else {
      dispatch({
        type: ACTIONS.MAKE_SEARCH_REQUEST,
      });
    }

    let timeout = setTimeout(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (typeOfRequest === "getById") {
            dispatch({
              type: ACTIONS.GET_DATA,
              payload: {
                movie: data,
              },
            });
          } else {
            dispatch({
              type: ACTIONS.GET_SEARCH_DATA,
              payload: {
                results: data.results,
              },
            });
          }
        })
        .catch((e) => {
          dispatch({
            type: ACTIONS.ERROR,
            payload: {
              error: e,
            },
          });
          console.log(e);
        });
    }, duration);

    if (!params) {
      clearTimeout(timeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [params, url, typeOfRequest, duration]);

  return state;
}