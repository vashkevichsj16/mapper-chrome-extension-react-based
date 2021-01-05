import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import PopupApp from './PopupApp';

console.log(chrome);
chrome.storage.local.get(null, function (data) {
    console.log(data)
});
ReactDOM.render(
    <React.StrictMode>
        <PopupApp/>
    </React.StrictMode>,
    document.getElementById('root')
);
