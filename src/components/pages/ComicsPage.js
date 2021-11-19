import React, { useState, useCallback}  from 'react';
import { Helmet } from 'react-helmet';
import ComicsList from "../comicsList/ComicsList"
import AppBanner from "../appBanner/AppBanner"
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const ComicsPage = ({onComicsChange}) => {

   

    return (
        <>
         <Helmet>
            <meta
                name="description"
                content="Page with list of our comics"
            />
            <title>Comics page</title>
        </Helmet>
            <AppBanner/>
            <ErrorBoundary>
                <ComicsList 
                    onComicsChange={(e)=>onComicsChange(e)}/>
            </ErrorBoundary>
            {/* <ErrorBoundary>
                <SingleComic comicData={comicData}/>
            </ErrorBoundary> */}
        </>
    )
}

export default ComicsPage;