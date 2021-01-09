import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import MapApp from './MapApp';

console.log("Waiting get chrome in map")
chrome.storage.local.get(null, function (data) {
    ReactDOM.render(
        <React.StrictMode>
            <MapApp mapModel = {data.mapModel}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
});
