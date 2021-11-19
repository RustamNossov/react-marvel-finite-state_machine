import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import setContent from '../utils/setContent';


import './charInfo.scss';

const CharInfo = (props) => {

    const [chars, setChars] = useState({})
    const {charId} = props;
    const {getCharacter, clearError, process, setProcess} = useMarvelService()

    const onChangeCharId = (charId) => {
        clearError();
        getCharacter(charId)
            .then(res=>setChars(res))
            .then(()=> setProcess('confirmed'))       
    }
    //setProcess('confirmed')
    
   

    useEffect(()=>{
        if (charId) onChangeCharId(charId) 
    }, [charId])
    
    
    
    // if (error) {
    //     return (
    //         <div className="char__info">
    //             <ErrorMessage/>
    //         </div>
    //     )
    // }
       
    // if (loading) {
    //     return (
    //         <div className="char__info">
    //             <Spinner/>
    //         </div>
    //     )
    // }
    
        
    
    const {comics, description, homepage, name, thumbnail, wiki} = chars
    let comicsList;
    if (comics !== undefined && comics.length !== 0) {
        comicsList = comics.slice(0, 10).map((item, i) => {
            const url = item.resourceURI
            const comicId = url.slice(url.lastIndexOf('/')+1)
            
            return (
                <li key={i} 
                    className="char__comics-item">
                    <Link to={{pathname: `/comics/${comicId}`, state: { prpg: `prevPage`} }}>{item.name}</Link>
                </li>
            )
        });
    } else {comicsList = [<div className="char__descr">We haven't find any comics with this character</div>]}
        
    const Content = ()=> {
        return (
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comicsList}
                </ul>
            </>

        )
    }

    


    return (
        
            <div className="char__info">
                 {setContent(process, Content)}
                
            </div>
           
        
    )
    
}

CharInfo.propTypes = {
    
        id: PropTypes.string
    
}

CharInfo.defaultProps = {
    chars: {
        name: 'TurumTurum'
    }
    
}

export default CharInfo;