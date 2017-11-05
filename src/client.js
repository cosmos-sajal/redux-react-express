"use strict";
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers/index';
import { postBooks, deleteBook, updateBook } from './actions/booksAction';
import { addToCart } from './actions/cartAction';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BookForm from './components/pages/bookForm';
import Main from './main';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

// Create Store and subscribe
const middleWare = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleWare);
const Routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={BooksList}/>
				<Route path="/admin" component={BookForm}/>
				<Route path="/cart" component={Cart}/>
			</Route>
		</Router>
	</Provider>
)

render(
	Routes, document.getElementById('app')
);
