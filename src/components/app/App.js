import React, {useCallback, useState, lazy, Suspense}  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { MainPage, ComicsPage, SingleComicPage } from '../pages';
import AppHeader from "../appHeader/AppHeader";
import  Spinner from '../spinner/Spinner';

const Page404 = lazy(()=> import('../pages/404'))
const MainPage = lazy(()=> import('../pages/MainPage'))
const ComicsPage = lazy(()=> import('../pages/ComicsPage'))
const SingleComicPage = lazy(()=> import('../pages/SingleComicPage'))


const App = () => {
    const [comicData, setComicData] = useState({})

    const onComicsChange = useCallback((comicData)=> {
        console.log(comicData)
        setComicData(comicData)
    }, [])

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                   <Suspense fallback={ <Spinner/> }>
                        <Routes>
                                <Route exact path="/" element={ <MainPage/> }/>
                                <Route exact path="/comics" element={ <ComicsPage onComicsChange={(comicData)=>onComicsChange(comicData)}/> }/>
                                <Route exact path="/comics/:id" element={ <SingleComicPage comicData={comicData}/> }/>
                                <Route path='*' element={ <Page404/> }/>
                        </Routes>   
                   </Suspense>
                </main>
            </div>

        </Router>
        
    )
    
} 

export default App;