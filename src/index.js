import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PopupApp from './popup/PopupApp';
import MapApp from './map/MapApp';
import reportWebVitals from './reportWebVitals';

if (inIframe () ) {
    ReactDOM.render(
        <React.StrictMode>
            <MapApp/>
        </React.StrictMode>,
        document.getElementById('root')
    );

} else {
    ReactDOM.render(
        <React.StrictMode>
            <PopupApp/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
