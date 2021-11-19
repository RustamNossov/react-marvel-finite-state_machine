
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';


import '../findCharacter/findCharacter.scss'

const FindCharacter = () => {
    return (
        
        <form className="char__find-char">
            
                <div className="char__find-header">Or find a character by name:</div>
                {/* <img src={thumbnail} alt={name}/>
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
                </div> */}
            
            {/* <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}
            </ul> */}
        </form>
    )
}

export default FindCharacter;