import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import PopupApp from './PopupApp';

chrome.storage.local.get(null, function (data) {
    console.log(data);
    ReactDOM.render(
        <React.StrictMode>
            <PopupApp data = {data}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
});
