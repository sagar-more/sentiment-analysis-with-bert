import reducer from "../reducers";
import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk';

const middleware = [ thunk ];
export const store = compose(
    applyMiddleware(...middleware),
)(createStore)(reducer);
