import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
 
import './singleComic.scss';

const SingleComic = ({comicData}) => {
        
        const {title, description, pageCount, price, thumbnail, language} = comicData
        const newDescription = description ? description.slice(0, 320)+'...' : "Unfortunately we do not have any description for this comic book."

        if (Object.keys(comicData).length === 0) { return <Navigate replace to="/wrongpage" />   }

        
        return (
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="description"
                        content={`${title} comics book`}
                    />
                    <title>{title}</title>
                </Helmet>
                <img src={thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{newDescription}</p>
                    <p className="single-comic__descr">{`${pageCount} pages`}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{`${price}$`}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        )

   
    
}

export default SingleComic;