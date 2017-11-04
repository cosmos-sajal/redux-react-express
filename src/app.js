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

// Create Store and subscribe
const middleWare = applyMiddleware(logger);
const store = createStore(reducers, middleWare);


// create and dispactch actions
store.dispatch(postBooks(
	{
		id : 1,
		title : "First book title",
		price : 100
	}

));

store.dispatch(postBooks(
	{
		id : 2,
		title : "Seconds book title",
		price : 200
	}
));

store.dispatch(postBooks(
	{
		id : 3,
		title : "Third book title",
		price : 300
	}
));

// store.dispatch(deleteBook({
// 	id : 2
// }));

// store.dispatch(updateBook(
// 	{
// 		'id' : 1,
// 		'title' : 'updated first book title'
// 	}
// ));

// store.dispatch(addToCart({
// 	id : 100
// }));


render(
	<Provider store={store}>
		<BooksList />
	</Provider>, document.getElementById('app')
);
