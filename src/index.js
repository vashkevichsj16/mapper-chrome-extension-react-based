import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PopupApp from './popup/PopupApp';
import MapApp from './map/MapApp';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {Store} from 'webext-redux';

const store = new Store();

console.log("starting?")
store.ready().then(() => {
    if (inIframe()) {
        ReactDOM.render(
            <React.StrictMode>
                <Provider store={store}>
                <MapApp/>
                </Provider>
            </React.StrictMode>,
            document.getElementById('popUpRoot')
        );

    } else {
        ReactDOM.render(
            <React.StrictMode>
                <Provider store={store}>
                <PopupApp/>
                </Provider>
            </React.StrictMode>,
            document.getElementById('root')
        );
    }
});
function inIframe () {
    return document.getElementById('popUpRoot');
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
