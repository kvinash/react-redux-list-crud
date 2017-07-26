import React, {Component} from 'react';

import NameForm from './container/form';
import Tgrid from './component/Tgrid';
import Head from './component/header';
import AboutMe from './container/aboutme';
import OfferTemplate from './container/OfferTemplate';
import ValidationForm from './container/ValidationExample';
import './style/header.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const AppRoute = () => (
  <Router>
    <div>
      <div className="clear"></div>
      <div className="mainContent">
      <Route exact path="/" component={Tgrid}/>
      <Route path="/add" component={NameForm}/>
      <Route path="/edit/:id" component={NameForm}/>
      <Route path="/emailTemplate" component={OfferTemplate}/>
      <Route path="/validationExample" component={ValidationForm}/>
      <Route path="/about" component={AboutMe}/>
    	</div>
    </div>
  </Router>
)

export default AppRoute;