
import { createStore } from 'redux';

import { combineReducers } from 'redux'
import {photoReducer} from '../reducers/photoReducer'
import {videoReducer} from '../reducers/videoReducer'
import {buyBtnIsOpen} from '../reducers/buyBtnIsOpenReducer'

export const initialState = {
  photos: {
    list: []
  },
  videos: {
    list: []
  },
  buyBtnIsOpen: {
    buyBtnIsOpen: false
  }
}


const allReducer = combineReducers({
  photos: photoReducer,
  videos: videoReducer,
  buyBtnIsOpen: buyBtnIsOpen,
})


export default allReducer

// STORE === GLOBALIZED STATE
export let myStore = createStore(
  allReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)