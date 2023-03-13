import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newListLoading: false,
        charOffset: 0,
        charListEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoadingStill();

        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoadingStill = () => {
        this.setState({
            newListLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }

        this.setState(({charOffset, charList}) => ({
            loading: false,
            newListLoading: false,
            charList: [...charList, ...newCharList],
            charOffset: charOffset + 9,
            charListEnded: ended
        }));
    }
    
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderList = (arr) => {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit': 'cover'};
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit': 'unset'};
            }

            return(
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
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

    render(){
        const {charList, loading, error, newListLoading, charOffset, charListEnded} = this.state;

        const items = this.renderList(charList)

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {spinner}
                {content}
                {errorMessage}
                <button 
                    className="button button__main button__long"
                    disabled={newListLoading}
                    onClick={() => this.onRequest(charOffset)}
                    style={{display: charListEnded ? 'none' : 'block'}}>
                    <div className="inner">
                        {newListLoading ? <Spinner spinnerScale={35}/> : 'Load More'}
                    </div>
                </button>
            </div>
        )
    }
}

export default CharList;