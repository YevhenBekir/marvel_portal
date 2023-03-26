import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const [comic, setComic] = useState(null);

    const { comicId } = useParams();

    const {loading, error, getOneComic, clearError} = useMarvelService();

    useEffect(() => {
        onUpdateComic();
    }, [comicId]) 

    const onUpdateComic = () => {
        clearError();

        getOneComic(comicId)
            .then(onChangeComic);
    }

    const onChangeComic = comic => {
        setComic(comic);
    }

    const content = !(error || loading || !comic) ? <View comic={comic}/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null
    
    return (
        <>
            {spinner}
            {content}
            {errorMessage}
        </>
    )
}

const View = ({comic}) => {
    const {thumbnail, title, description, pageCount, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: en/us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;