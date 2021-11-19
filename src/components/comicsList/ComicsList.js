import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './comicsList.scss';



const ComicsList = ({onComicsChange}) => {

    const [comicsList, setComicsList] = useState([]);
    const [elements, setElements] = useState([]);
    //const [buttonDisabled, setButtonDisabled] = useState(false)
    const {getAllComics, loading, error, btnDisabled} = useMarvelService()

    const requesComics = () => {
        console.log('reques comics')
        const offset = Math.floor(Math.random() * 1000 + 1000)
        getAllComics(offset)
        .then(data => {
            const newData = [...comicsList, ...data]
            setComicsList(newData)}
            )
    }

    useEffect(()=> {
        requesComics()
    }, [])

    const showMoreComics = () => {
        requesComics()
    }

    const onComicsClick = (e) => {
        e.preventDefault();
        onComicsChange(comicsList[e.currentTarget.getAttribute('data-selected-book')])
    }


    useEffect(()=>{
        if (comicsList) {
            const elements = comicsList.map((item, i) => {
                const {id, title, price, thumbnail} = item
                return (
                    <li key={id} data-id={id} data-selected-book={i} onClick={(e)=>onComicsClick(e)} className="comics__item">
                        <Link to={`/comics/${id}`}>
                            <img src={thumbnail} alt={'the picture of' + title + 'comic book'} className="comics__item-img"/>
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{price > 0 ? price+'$' : null}</div>
                        </Link>
                    </li>
                )
            })
            setElements(elements)
        }
    }, [comicsList])
    
    const errorElement = error ? <ErrorMessage/> : null;
    const loadingElement =  elements.length === 0 && !error ? <Spinner/> : null;
    
    return (
        <div className="comics__list">
            {errorElement}
            {loadingElement}
            <ul className="comics__grid">
                {elements}
            </ul>
            <button 
                onClick={showMoreComics} 
                className="button button__main button__long"
                disabled={btnDisabled}>
                    <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;