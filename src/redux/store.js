import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import weatherReducer from "./reducers/weatherReducer";

let reducers = combineReducers({
    weatherReducer
})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;