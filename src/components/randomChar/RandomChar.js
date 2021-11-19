import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../utils/setContent';
import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';



const RandomChar = () => {
    const [char, setChar] = useState({});
    const {getRundomCharacter, clearError, setProcess, process} = useMarvelService();

     
    useEffect(()=>{
        updateChar();

        const timerId = setInterval(updateChar, 600000);
        return () => {
            clearInterval(timerId)
        }
    }, []);
    
    const updateChar = () => {
        clearError();
        console.log('RandomCHar!')
        getRundomCharacter()
            .then(data => setChar(data))
            .then(()=>setProcess('confirmed'))
    }

    


    return (
            <div className="randomchar">
               
                {setContent(process, View, char  )}
                
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                            onClick = {updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        
    )   
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, isTherePicture} = char;    
    
    const newDescr = !(description === undefined) && description.length > 180 ? `${description.substr(0, 180)}...` : description;

    const clazz = isTherePicture ?  "randomchar__img" : "randomchar__img randomchar__no-img"
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={clazz}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {/* As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate... */}
                    {newDescr}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;