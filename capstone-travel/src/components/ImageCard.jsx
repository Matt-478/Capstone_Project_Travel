

export default function ImageCard({src, key}) {
  return(
    <>
      <li>
          <img src={src} alt="" className="" key={key}/>

          {/* on :hover we display photographer and link? whic is the photographers name itself */}
      </li>
    </>
  )
}
