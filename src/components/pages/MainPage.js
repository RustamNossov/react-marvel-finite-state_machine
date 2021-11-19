import {useState, useCallback} from 'react';
import { Helmet } from 'react-helmet';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import FindACharacter from '../findCharacter/FindACharacter';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';


const MainPage = () => {

    const [charId, setCharId] = useState(null)
    const onChangeCharId = useCallback((charId)=> {
        setCharId(charId)
    }, [])
    return (
        <>
        <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
            />
            <title>Marvel information</title>
        </Helmet>
        <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
            
            <div className="char__content">
                <ErrorBoundary>
                    <CharList 
                        onChangeCharId={(id)=>onChangeCharId(id)}/>
                </ErrorBoundary>
                <div>
                <ErrorBoundary>
                    <CharInfo charId={charId}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <FindACharacter/>
                </ErrorBoundary>

                </div>
                   
                    
                   
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
    )
}

export default MainPage;