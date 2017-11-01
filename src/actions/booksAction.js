"use strict";

export function postBooks(book) {
	return {
		type : 'POST_BOOK',
		payload : book
	};
}

export function deleteBook(id) {
	return {
		type : 'DELETE_BOOK',
		payload : id
	};
}

export function updateBook(book) {
	return {
		type : 'UPDATE_BOOK',
		payload : book
	}
}