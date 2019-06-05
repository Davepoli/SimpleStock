import {
    FETCH_STOCKS_BEGIN,
    FETCH_STOCKS_SUCCESS,
    FETCH_STOCKS_FAILURE
} from '../actions/stocksActions'

const initialState = {
    stocks: [],
    loading: false,
    error: null
  };

  
export default ( state = initialState, action ) => {
    switch (action.type) {
        case FETCH_STOCKS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
              };
        case FETCH_STOCKS_SUCCESS:
            return {
                ...state,
                loading: false,
                stocks: [...state.stocks, {...action.payload.stocks, ticker: action.payload.ticker}]
            }
        case FETCH_STOCKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                stocks: []
            }
        default:
            return state
    }
}

