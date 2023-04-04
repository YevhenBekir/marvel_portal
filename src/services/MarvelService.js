import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, error, process, setProcess, request, clearError } =
    useHttp();

  const _api = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=d00625f910504c183dcc49764a173c62";
  const _charLimit = 9;
  const _charOffset = 0;

  const _comicsLimit = 8;
  const _comicsOffset = 0;

  const getAllCharacters = async (offset = _charOffset) => {
    const res = await request(
      `${_api}characters?limit=${_charLimit}&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getOneCharacter = async (id) => {
    const res = await request(`${_api}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (offset = _comicsOffset) => {
    const res = await request(
      `${_api}comics?issueNumber=15?orderBy=issueNumber&limit=${_comicsLimit}&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformComics);
  };

  const getOneComic = async (id) => {
    const res = await request(`${_api}comics/${id}?${_apiKey}`);

    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      pageCount: comic.pageCount + " p.",
      price:
        comic.prices[0].price > 0
          ? comic.prices[0].price + " $"
          : "NOT AVAILABLE",
    };
  };
  return {
    loading,
    error,
    process,
    setProcess,
    clearError,
    getAllCharacters,
    getOneCharacter,
    getAllComics,
    getOneComic,
  };
};

export default useMarvelService;
