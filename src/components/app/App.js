import { useState } from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

import '../../style/style.scss';

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null)
    const [view, setView] = useState(true)
    const [autoUpdater, setAutoUpdater] = useState(false)

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    const onChangeView = () => {
        setView( view => !view);
    }

    const onChangeAutoUpdater = () => {
        setAutoUpdater(autoUpdater => !autoUpdater)
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    {view ? <RandomChar autoUpdater={autoUpdater}/> : null}
                    <Buttons onChangeAutoUpdater={onChangeAutoUpdater} onChangeView={onChangeView}/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

const Buttons = ({onChangeAutoUpdater, onChangeView}) => {
    return(
        <div
            style={{display: 'flex', justifyContent: 'space-around', marginTop: '15px'}}>
            <button onClick={onChangeAutoUpdater} className="button button__main">
                <div className="inner">Turn on/off the auto-updater</div>
            </button>
            <button onClick={onChangeView} className="button button__secondary">
                <div className="inner">Hide/show random selection</div>
            </button>
        </div>
    )
}

export default App;