import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PopupApp from './PopupApp';
import reportWebVitals from './reportWebVitals';

const el = document.getElementById('root').getAttribute('data-param');
if (el === "popup1") {
    ReactDOM.render(
        <React.StrictMode>
            <PopupApp/>
        </React.StrictMode>,
        document.getElementById('root')
    );
} else {

}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
