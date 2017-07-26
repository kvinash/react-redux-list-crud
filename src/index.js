import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import Head from './component/header';
import Footer from './component/Footer'
import AppRoute from './route';
//import logo from './logo.svg';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
//example for create element by react createElement function
const user =  { firstName: "Kapil", lastName: "Yadav" };

ReactDOM.render(
	
	<Provider store = {store}>
	{/* <Head/> */}
	<AppRoute />
	{/* <Footer user={user}/> */}
	</Provider>
	,
	document.getElementById('root')
);