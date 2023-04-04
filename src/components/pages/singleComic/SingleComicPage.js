import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import useMarvelService from "../../../services/MarvelService";
import { setContent } from "../../../utils/setContent";

import "./singleComicPage.scss";

const SingleComicPage = () => {
  const [comic, setComic] = useState(null);

  const { comicId } = useParams();

  const { process, setProcess, getOneComic, clearError } = useMarvelService();

  useEffect(() => {
    onUpdateComic();
  }, [comicId]);

  const onUpdateComic = () => {
    clearError();

    getOneComic(comicId)
      .then(onChangeComic)
      .then(() => setProcess("confirmed"));
  };

  const onChangeComic = (comic) => {
    setComic(comic);
  };

  return <>{setContent(process, View, comic)}</>;
};

const View = ({ data }) => {
  const { thumbnail, title, description, pageCount, price } = data;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${title} comic page`} />
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: en/us</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
