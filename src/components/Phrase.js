import './Phrase.css'

const Phrase = ({...props}) =>{
    return(
        <h1 className="phrase">{props.text}</h1>
    )
}

export default Phrase