// ACTION
export const addVid= (videos) => {
  return {
    type: "ADD_VID",
    payload: videos
  }
}

export const addPhotos= (photos) => {
  return {
    type: "ADD_PHOTO",
    payload: photos
  }
}

export const buyBtnIsOpen = () => {
  return {
    type: "CHANGE_IS_OPEN",
  }
}