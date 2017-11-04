import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksAction';
import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './Cart';
import { Grid, Col, Row, Button } from 'react-bootstrap';

class BooksList extends React.Component {
	componentDidMount() {
		this.props.getBooks();
	}

	render() {
		const booksList = this.props.books.map(function(book) {
			return(
				<Col xs={12} sm={4} md={3} key={book._id}>
					<BookItem
						_id={book._id}
						description={book.description}
						title={book.title}
						price={book.price}
					/>
				</Col>
			);
		});

		return(
			<Grid>
				<Row>
					<Cart />
				</Row>
				<Row style={{marginTop : '15px'}}>
					<Col xs={12} sm={6}>
						<BookForm />
					</Col>
					{booksList}
				</Row>
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	return {
		books : state.books.books
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getBooks : getBooks
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
