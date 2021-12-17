

// this reducer should return something like this every time:
//{
//  list: []
//}

import { initialState } from "../store"

export const photoReducer = (state = initialState.photos , action) => {
  switch(action.type) {
    case "ADD_PHOTO":
      return {
        ...state,
        list: action.payload
      }
    default:
      return state
  }
}