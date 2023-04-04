import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import { setContent } from "../../utils/setContent";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { process, setProcess, clearError, getOneCharacter } =
    useMarvelService();

  useEffect(() => {
    onUpdateChar();
  }, [props.charId]);

  const onUpdateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();

    getOneCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
  const { name, description, homepage, wiki, thumbnail, comics } = data;

  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "unset" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length <= 0 ? (
          <li
            className="char__comics-item"
            style={{ boxShadow: "0px 4px 4px rgba(255, 0, 0, 0.3)" }}
          >
            "This character is not currently in any comics"
          </li>
        ) : (
          comics.map((item, i) => {
            if (i > 9) {
              return null;
            }
            return (
              <li className="char__comics-item" key={i}>
                {item.name}
              </li>
            );
          })
        )}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
