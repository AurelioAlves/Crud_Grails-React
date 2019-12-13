import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App';
import './css/App.css';
import './css/grails.css';
import './css/main.css';
import Banda from './Banda';
import Local from './Local';
import Shows from './Shows'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App}/>
            <Route path='/banda' component={Banda}/>
            <Route path='/local' component={Local}/>
            <Route path='/shows' component={Shows} />
        </div>
    </Router>,
  document.getElementById('root')
);
