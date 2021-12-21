import { initialState } from "../store"

export const buyBtnIsOpen = (state = initialState.buyBtnIsOpen , action) => {
  switch(action.type) {
    case "CHANGE_IS_OPEN":
      return {
        ...state,
        isOpened: !state.isOpened
      }
    default:
      return state
  }
}