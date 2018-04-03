import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
ReactDOM.render(<App />, document.getElementById('root'));

// Added to break cache
unregister()