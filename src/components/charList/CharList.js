import React, {useEffect, useState, useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import { CSSTransition, TransitionGroup } from 'react-transition-group';


import './charList.scss';

const setContent = (process, Content) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return <Content/>;
            break;
        case 'confirmed'://console.log(content)
            return  <Content/>;
            break;
        case 'error': 
            return <ErrorMessage/>
            break
        default:
            throw new Error('Unexpected process state')
    }
}

const CharList = (props) => {
    const [chars, setChars] = useState([]),
          [buttonDisabled, setButtonDisabled] = useState(false),
          [buttonVisible, setButtonVisible] = useState(true),
          [counter, setCounter] = useState(1),
          [content, setCont] = useState(null);
          
          

    const {getAllCharacters, error, process, setProcess} = useMarvelService();

    useEffect(()=>{
        onloadCharacters();
    }, []);

    const rndOffset = Math.floor(Math.random() * 1501)

    const onloadCharacters = ()=> {
        
        getAllCharacters(9, rndOffset)
        .then(res=> {
            props.onChangeCharId(res[0].id)
            setChars(res);
        })
        .then(()=>setProcess('confirmed'))
        
    }

    const onMoreItems=  ()=> {
       // const {logger, secondLog} = await import('./someFunc.js')
       // secondLog()
        setButtonDisabled(true);
        setCounter(counter => ++counter);
        getAllCharacters(9, rndOffset)
        .then(res=> {
            const data = [...chars, ...res];
            setChars(data);
            setButtonDisabled(false);
            
            if (counter > 4) {
                setButtonVisible(false);
            }
            
        })
        .then(()=>setProcess('confirmed'))
    }

    const arr = useRef([]);

    const onCharSelect = (e) => {
        props.onChangeCharId(+e.currentTarget.getAttribute('data-key'));
        arr.current.forEach(item => item.classList.remove('char__item-selected'))
        e.currentTarget.classList.add('char__item-selected')   
    }

    const onKeyPress = (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            onCharSelect(e);
        }
    }

    useEffect(()=>{
        
        const content = chars.map((item, i)=> {
            const clazz = item.isTherePicture ? 'char_img' : 'char_no_img';
            const itemClazz = i===0 ? "char__item char__item-selected" : "char__item"
            return (
                    
                        <CSSTransition in={true} appear timeout={500} classNames="my-node">
                            <li className={itemClazz} 
                                tabIndex={0}
                                key = {item.id}
                                data-key={item.id}
                                ref={el => arr.current[i] = el}
                                onClick={onCharSelect}
                                onKeyPress={onKeyPress}>
                                <img src={item.thumbnail} className={clazz} alt="abyss"/>
                                <div className="char__name">{item.name}</div>
                            </li>
                        </CSSTransition>
                
                
               
            )
        })
        setCont(content)
    }, [chars])
    
    
    
    // const elementError = error ? <ErrorMessage/> : null
    // const elementLoading = (!content || content.length  === 0) &&  !error ? <Spinner/> : null;
   
    const Content = () => {
        return (
            <TransitionGroup>
                    <ul className="char__grid">
                        
                        {content}
                    
                    </ul>
            </TransitionGroup>
        )
    }
    const elements = useMemo(()=>{
        console.log(content)
        return (
            setContent(process, Content)
        )
    }, [process, chars])

    return (
        <div className="char__list">
            {/* {elementLoading}
            {elementError} */}
           {/* <Content/> */}
           {/* {setContent(process, Content)} */}
           {elements}
            
            <button 
                className="button button__main button__long"
                onClick={onMoreItems}
                disabled = {buttonDisabled}
                style={{'display': buttonVisible ? 'block' : 'none'}}>
                <div className="inner">load more</div>
            </button>
           
        </div>
    )
    
}

CharList.propTypes = {
    onChangeCharId: PropTypes.func
}



export default CharList;