
const VideoCard = (src, key) => {
  return(
    <video>
       <source src={src} key={key} type="video/mp4"></source>
       <p>src: {src}</p>
    </video>
  )
}

export default VideoCard