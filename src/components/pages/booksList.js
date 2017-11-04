import React from 'react';
import { connect } from 'react-redux';

class BooksList extends React.Component {
	render() {
		const booksList = this.props.books.map(function(book) {
			return(
				<div key={book.id}>
					<h1>
						{book.title}
					</h1>
				</div>
			);
		});

		return(
			<div>
				{booksList}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		books : state.books.books
	};
}

export default connect(mapStateToProps)(BooksList);
