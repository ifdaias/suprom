
const Phrase = ({...props}) =>{
    return(
        <h1 style={{fontWeight: 500, fontSize: '5vw', marginRight: `${props.marginRight}`, marginLeft: `${props.marginLeft}`}}>{props.text}</h1>
    )
}

export default Phrase