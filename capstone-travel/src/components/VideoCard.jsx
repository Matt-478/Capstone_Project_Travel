
const VideoCard = ({src}) => {
  return(
    // <video>
    //    <source src={src} type="video/mp4"></source>
    // </video>

    <iframe src={src}
        frameborder='0'
        allowfullscreen='false'
        allow='autoplay; encrypted-media'
        title='video'
        width='500px'
        height='auto'
        frameBorder="0"
        className='video-responsive'
      />
  )
}

export default VideoCard