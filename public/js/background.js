import {wrapStore} from 'webext-redux';
import { createStore } from 'redux'
function reducer(state, action) {

    return state;
}

const store = createStore(reducer); // a normal Redux store
wrapStore(store);