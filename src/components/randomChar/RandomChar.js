import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import { setContent } from "../../utils/setContent";
import mjolnir from "../../resources/img/mjolnir.png";

import "./randomChar.scss";

const RandomChar = (props) => {
  const [char, setChar] = useState({});

  const { error, process, setProcess, clearError, getOneCharacter } =
    useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    const timerId = props.autoUpdater ? setInterval(updateChar, 3000) : null;

    return () => {
      clearInterval(timerId);
    };
  }, [props.autoUpdater]);

  const updateChar = () => {
    //вичислення діапазону персонажів
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    //для перевірки на підписку
    console.log("component was update");

    clearError();

    getOneCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"))
      .catch(onReloadChar);
  };

  const onReloadChar = () => {
    if (!(props.autoUpdater && !error)) {
      setTimeout(updateChar, 1800);
    }
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const onClickChangeChar = () => {
    updateChar();
  };

  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className="button button__main"
          onClick={() => onClickChangeChar()}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { thumbnail, name, description, wiki, homepage } = data;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        style={
          thumbnail ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? { objectFit: "contain" }
            : { objectFit: "cover" }
        }
        alt={name + ".jpg"}
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
