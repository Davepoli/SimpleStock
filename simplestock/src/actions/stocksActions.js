import axios from 'axios'

export const FETCH_STOCKS_BEGIN   = 'FETCH_STOCKS_BEGIN';
export const FETCH_STOCKS_SUCCESS = 'FETCH_STOCKS_SUCCESS';
export const FETCH_STOCKS_FAILURE = 'FETCH_STOCKS_FAILURE';

export const fetchStocksBegin = () => ({
  type: FETCH_STOCKS_BEGIN
});

export const fetchStocksSuccess = (ticker, stocks) => ({
  type: FETCH_STOCKS_SUCCESS,
  payload: { ticker, stocks }
});

export const fetchStocksFailure = error => ({
  type: FETCH_STOCKS_FAILURE,
  payload: { error }
});

export const fetchStocks = (stocks) => {
  return dispatch => {
      dispatch(fetchStocksBegin())
      return stocks.map(stockTicker => axios.get(`https://api.iextrading.com/1.0/stock/${stockTicker}/chart`)
              .then(response => dispatch(fetchStocksSuccess(stockTicker, response.data[18])))
              .catch((error) => dispatch(fetchStocksFailure(error)))
      )
          
  }
}