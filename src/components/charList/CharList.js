import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newListLoading, setNewListLoading] = useState(false);
    const [charOffset, setCharOffset] = useState(0);
    const [charListEnded, setCharListEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(charOffset, true);
    }, [])

    const onRequest = (offset, onLoading) => {
        onLoading ? setNewListLoading(false) : setNewListLoading(true)

        getAllCharacters(offset)
            .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }

        setNewListLoading(false);
        setCharList([...charList, ...newCharList]);
        setCharOffset(charOffset => charOffset + 9);
        setCharListEnded(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderList(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit': 'unset'};
            }

            return(
                <li 
                className="char__item"
                ref={el => itemRefs.current[i] = el}
                key={item.id}
                onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnItem(i);
                }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderList(charList)

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newListLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {spinner}
            {items}
            {errorMessage}
            <button 
                className="button button__main button__long"
                disabled={newListLoading}
                onClick={() => onRequest(charOffset)}
                style={{display: charListEnded ? 'none' : 'block'}}>
                <div className="inner">
                    {newListLoading ? <Spinner spinnerScale={35}/> : 'Load More'}
                </div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;