import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const [view, setView] = useState(true);
  const [autoUpdater, setAutoUpdater] = useState(false);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  const onChangeView = () => {
    setView((view) => !view);
  };

  const onChangeAutoUpdater = () => {
    setAutoUpdater((autoUpdater) => !autoUpdater);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        {view ? <RandomChar autoUpdater={autoUpdater} /> : null}
        <Buttons
          onChangeAutoUpdater={onChangeAutoUpdater}
          autoUpdater={autoUpdater}
          onChangeView={onChangeView}
          view={view}
        />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

const Buttons = ({ onChangeAutoUpdater, autoUpdater, onChangeView, view }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "15px",
      }}
    >
      <button onClick={onChangeAutoUpdater} className="button button__main">
        <div className="inner">
          Autoupdater is {autoUpdater && view ? "on" : "off"}
        </div>
      </button>
      <button onClick={onChangeView} className="button button__secondary">
        <div className="inner">Hide/show random selection</div>
      </button>
    </div>
  );
};

export default MainPage;
