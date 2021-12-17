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

export const addCount = () => {
  return {
    type: "ADD_COUNT"
  }
}