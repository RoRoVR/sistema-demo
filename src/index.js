import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// REDUX
import { Provider }  from 'react-redux';
import { store } from "./redux/store/store";

// ESTILOS
import './styles/styles.scss';
import '@popperjs/core';
import 'bootstrap';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store} >
            <App />
        </Provider>
    </React.StrictMode>
);
