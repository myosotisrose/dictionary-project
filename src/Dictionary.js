import "./Dictionary.css"
import { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";

export default function Dictionary(props) {
    let [keyword, setKeyword] = useState(props.defaultKeyword);
    let [results, setResults] = useState(null);
    let [loaded, setLoaded] = useState(false)
    let [photos, setPhotos] = useState(null);

    function handleDictionaryResponse(response) {
        setResults(response.data[0]);
    }

    function handleSheCodesApiResponse(response) {
        setPhotos(response.data.photos);
    }

    function search() {
        // documentation: https://dictionaryapi.dev/
        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
        axios.get(apiUrl).then(handleDictionaryResponse);

        let sheCodesApiKey = "3cfb28a967606afe422fo796tf552d53";
        let sheCodesApiUrl = `https://api.shecodes.io/images/v1/search?query=${keyword}&key=${sheCodesApiKey}`;

        axios.get(sheCodesApiUrl).then(handleSheCodesApiResponse);
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }

    function handleKeywordChange(event) {
        setKeyword(event.target.value);
    }

    function load() {
        setLoaded(true);
        search();
    }

    if (loaded) {
        return (
            <div className="Dictionary">
                <section>
                    <h1>What word do you want to look up?</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="search" onChange={handleKeywordChange} defaultValue={props.defaultKeyword} />
                    </form>
                    <div className="hint">
                        suggested words: sunset, wine, forest, plant...
                    </div>
                </section>
                <Results results={results} />
                <Photos photos={photos} />
            </div>
        );
    } else {
        load();
        return "Loading";
    }
}

