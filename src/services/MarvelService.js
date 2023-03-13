const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
const _apiKey = 'apikey=d00625f910504c183dcc49764a173c62';
const _charLimit = 9;
const _charOffset = 0;

class MarvelService {
    getResources = async(url = '') => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async (offset = _charOffset) => {
        const res = await this.getResources(`${_apiBase}characters?limit=${_charLimit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getOneCharacter = async (id) => {
        const res = await this.getResources(`${_apiBase}characters/${id}?${_apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    };

};

export default MarvelService;