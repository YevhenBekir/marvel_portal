import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(8);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [comicsListEnded, setComicsListEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onUpdateComics(offset, true);
    }, []);

    const onUpdateComics = (offset, onFirstLoading) => {
        onFirstLoading ? setNewComicsLoading(false) : setNewComicsLoading(true)

        getAllComics(offset)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if(newComics.length < 8){
            ended = true;
        }

        setNewComicsLoading(newComicsLoading => false);
        setComics([...comics, ...newComics]);
        setOffset(offset => offset + 8);
        setComicsListEnded(comicsListEnded => ended);
    }

    const renderComicsList = (comicsArr) => {
        const items = comicsArr.map((comic, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if(comic.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <li 
                    className="comics__item"
                    key={i}>
                    <Link to={`/comics/${comic.id}`}>
                        <img src={comic.thumbnail} alt={comic.title} className="comics__item-img" style={{imgStyle}}/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price === 0 ? 'NOT AVAILABLE' : `${comic.price}$`}</div>
                    </Link>
                </li>
            )
        })

        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const comicsList = renderComicsList(comics);

    // const content = !(error || loading) ? comicsList : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {spinner}
            {comicsList}
            {errorMessage}
            <button 
                className="button button__main button__long"
                onClick={() => onUpdateComics(offset)}
                disabled={newComicsLoading}
                style={{display: comicsListEnded ? 'none' : 'block'}}>
                <div className="inner">
                    {newComicsLoading ? <Spinner spinnerScale={35}/> : 'load more'} 
                </div>
            </button>
        </div>
    )
}

export default ComicsList;