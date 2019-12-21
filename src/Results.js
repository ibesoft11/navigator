import React, { useState, useEffect } from 'react';
import './App.css';
import './Results.css';
import { getRequest } from './Request';

function Results(props) {

    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({});

    useEffect(() => {
        setValue(props.query);
        getRequest(`suggest?fq=type:adres&q=${props.query}&start=0&rows=10&fq=*:*`).then(data => {
            setPlaces(data);
        });
    }, []);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const getDetails = (id) => {
        getRequest(`lookup?id=${id}`).then(data => {
            setDetails(data[0]);
        });
    }

    const search = async (e) => {
        e.preventDefault();
        getRequest(`suggest?fq=type:adres&q=${value}&start=0&rows=10&fq=*:*`).then(data => {
            setPlaces(data);
        });
      };

    return (
        <div className="results-div">
            <h2>Navigator Search</h2>
            <div class="wrap">
                <div class="search1">
                    <input type="text" class="searchTerm" placeholder="Search for your city" onChange={handleChange} value={value} />
                    <button type="submit" class="searchButton" onClick={search}>
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div className="flex-container">
                    {places && places.length > 0 ?
                        <ul className="results">
                            {places && places.map(place =>
                                <li key={place.id}>
                                    <a href="#" onClick={()=> getDetails(place.id)}><h4>{place.weergavenaam}</h4></a>
                                    <span>{place.type}</span>
                                </li>
                            )}
                        </ul> : 'No results found'}
                </div>
                {
                    Object.keys(details).length > 0 ? 
                    <div className="flex-container details">
                    <h2>Details</h2>
                    <div className="label">
                        <label>Bron: {details.bron}</label>
                    </div>
                    <div className="label">
                        <label>Identificatie: {details.identificatie}</label>
                    </div>
                    <div className="label">
                        <label>Provinciecode: {details.provinciecode}</label>
                    </div>
                    <div className="label">
                        <label>Type: {details.type}</label>
                    </div>
                    <div className="label">
                        <label>Provincienaam: {details.provincienaam}</label>
                    </div>
                    <div className="label">
                        <label>Centroide_ll: {details.centroide_ll}</label>
                    </div>
                    <div className="label">
                        <label>Weergavenaam: {details.weergavenaam}</label>
                    </div>
                    <div className="label">
                        <label>Provincieafkorting: {details.provincieafkorting}</label>
                    </div>
                    <div className="label">
                        <label>Centroide_rd: {details.centroide_rd}</label>
                    </div>
                    <div className="label">
                        <label>Id: {details.id}</label>
                    </div>
                </div> : ''
                }
            </div>
        </div>
    );
}

export default Results;