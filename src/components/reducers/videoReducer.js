import { initialState } from "../store"

export const videoReducer = (state = initialState.videos, action) => {
    switch(action.type) {
      case "ADD_VID":
        return {
          ...state,
          list: action.payload
        }
        default:
          return state
  }
}