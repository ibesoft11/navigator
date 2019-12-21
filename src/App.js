import React, { useState } from 'react';
import './App.css';
import Autosuggest from 'react-autosuggest';
import Results from './Results';
import { getRequest } from './Request';
import { useEffect } from 'react';

function App() {

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [places, setPlaces] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    getRequest('suggest?fq=type:adres&q=&start=1&rows=100&fq=*:*').then(data => {
      setPlaces(data);
    }).catch(error => {
      alert('Sorry, an error occured, try again.');
    });
  }, []);

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : places.filter(place =>
      place.weergavenaam && place.weergavenaam.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const getSuggestionValue = suggestion => suggestion.weergavenaam;

  const renderSuggestion = suggestion => (
    <div>
      {suggestion.weergavenaam}
    </div>
  );

  const onChange = async (event, { newValue }) => {
    event.preventDefault();
    setValue(newValue);
    if (newValue.trim() !== '') {
      try {
        let data = await getRequest(`suggest?fq=type:adres&q=${newValue}&start=0&rows=100&fq=*:*`);
        setPlaces(data);
      } catch (error) {
        alert('Sorry, an error occured, try again.');
      }
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };


  const inputProps = {
    placeholder: 'Search for your city',
    value,
    onChange: onChange
  };

  const search = async (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    !showResults ?
      <div className="s01">
        <form className="search" method="get" onSubmit={search} >
          <legend>City Navigator</legend>
          <div>
            <div class="inner-form">
              <div class="input-field first-wrap">
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
              </div>
              <div class="input-field third-wrap">
                <button class="btn-search" type="submit" onClick={search}>Search</button>
              </div>
            </div>
          </div>
        </form>
      </div> : <Results query={value} />
  );
}

export default App;