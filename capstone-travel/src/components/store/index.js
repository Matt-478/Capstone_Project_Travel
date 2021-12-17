
import { createStore } from 'redux';

import { combineReducers } from 'redux'
import {photoReducer} from '../reducers/photoReducer'
import {videoReducer} from '../reducers/videoReducer'

export const initialState = {
  photos: {
    list: []
  },
  videos: {
    list: []
  }
}


const allReducer = combineReducers({
  photos: photoReducer,
  videos: videoReducer,
})


export default allReducer

// STORE === GLOBALIZED STATE
export let myStore = createStore(
  allReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)