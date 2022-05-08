
const VideoCard = ({id, src, query}) => {
  return(
    <li  style={{
      outline: query.length >4 ? "8px dashed #bbff27" : "none",
      border: query.length >4 ? "22px solid #081405" : "none"
    }}>
      <video autoPlay controls loop muted>
         <source src={src} type="video/mp4" />
      </video>
    </li>
  )
}

export default VideoCard


    // console.log("items passed down in Video Card", items),

    // <iframe src={src}
    //     frameborder='0'
    //     allowfullscreen='false'
    //     allow='autoplay; encrypted-media'
    //     title='video'
    //     width='500px'
    //     height='auto'
    //     frameBorder="0"
    //     className='video-responsive'
    //   />