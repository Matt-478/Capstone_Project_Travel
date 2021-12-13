
const VideoCard = ({id, src}) => {
  return(

    <video autoPlay controls >
       <source src={src} type="video/mp4">
         {/* id: {id} */}
       </source>
    </video>
    // <p>Each id: {id}</p>
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