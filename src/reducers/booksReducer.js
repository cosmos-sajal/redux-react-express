"use strict";

// Create reducers
export function booksReducer(state = {books : []}, action) {
	const booksArr = [...state.books];
	switch(action.type) {
		case 'POST_BOOK' :
			return {books : [...state.books, action.payload]};
			break;
		case 'DELETE_BOOK' :
			const indexToDelete =
			booksArr.findIndex(function(book) {
				return book.id === action.payload.id
			});

			return indexToDelete >= 0 ? {books : [...booksArr.slice(0, indexToDelete), ...booksArr.slice(indexToDelete + 1)]} : state;
			break;
		case 'UPDATE_BOOK' :
			const indexToUpdate =
			booksArr.findIndex(function(book) {
				return book.id === action.payload.id
			});
			const newBook = {...booksArr[indexToUpdate], title : action.payload.title};

			return indexToUpdate >= 0 ? {books : [...booksArr.slice(0, indexToUpdate), newBook, ...booksArr.slice(indexToUpdate + 1)]} : state;
	}

	return state;
}
