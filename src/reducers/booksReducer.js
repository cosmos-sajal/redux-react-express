"use strict";

// Create reducers
export function booksReducer(state = {books : [
	{
		_id : 1,
		title : "First book title",
		description : "This is first book description",
		price : 100
	},
	{
		_id : 2,
		title : "Seconds book title",
		description : "This is second book description",
		price : 200
	},
	{
		_id : 3,
		title : "Third book title",
		description : "This is third book description",
		price : 300
	}]}, action) {
	const booksArr = [...state.books];
	switch(action.type) {
		case 'GET_BOOKS':
			return {books: [...state.books]};
		case 'POST_BOOK' :
			return {books : [...state.books, action.payload]};
			break;
		case 'DELETE_BOOK' :
			const indexToDelete =
			booksArr.findIndex(function(book) {
				return book._id === action.payload._id
			});

			return indexToDelete >= 0 ? {books : [...booksArr.slice(0, indexToDelete), ...booksArr.slice(indexToDelete + 1)]} : state;
			break;
		case 'UPDATE_BOOK' :
			const indexToUpdate =
			booksArr.findIndex(function(book) {
				return book._id === action.payload._id
			});
			const newBook = {...booksArr[indexToUpdate], title : action.payload.title};

			return indexToUpdate >= 0 ? {books : [...booksArr.slice(0, indexToUpdate), newBook, ...booksArr.slice(indexToUpdate + 1)]} : state;
	}

	return state;
}
