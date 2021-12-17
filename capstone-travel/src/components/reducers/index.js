const BigArrayHolder = (state = 0, action) => {
  switch(action.type) {
    case "HOLD": 
      return state + 1
    default:
      return state
  }
}

export default BigArrayHolder