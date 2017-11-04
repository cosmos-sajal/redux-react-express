import React from 'react';
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postBooks, deleteBook } from '../../actions/booksAction';
import { findDOMNode } from 'react-dom';

class BookForm extends React.Component {
	handleSubmit() {
		const book = {
			'title' : findDOMNode(this.refs.title).value,
			'description' : findDOMNode(this.refs.description).value,
			'price' : findDOMNode(this.refs.price).value,
		};
		this.props.postBooks(book);
	}

	onDelete() {
		this.props.deleteBook({'_id' : findDOMNode(this.refs.delete).value});
	}

	render() {
		const booksList = this.props.books.map(function(book) {
			return <option key={book._id}>{book._id}</option>
		});

		return(
			<Well>
				<Panel>
					<FormGroup controlId="title">
						<ControlLabel>Title</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Title"
							ref="title"
							/>
					</FormGroup>
					<FormGroup controlId="description">
						<ControlLabel>Description</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Description"
							ref="description"
							/>
					</FormGroup>
					<FormGroup controlId="price">
						<ControlLabel>Price</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Price"
							ref="price"
							/>
					</FormGroup>
					<Button 
					bsStyle="primary"
					onClick={this.handleSubmit.bind(this)}>Save Book</Button>
				</Panel>
				<Panel >
					<FormGroup controlId="formControlsSelect">
						<ControlLabel>Select a book id to delete</ControlLabel>
						<FormControl ref="delete" componentClass="select" placeholder="select">
							<option value="select">select</option>
							{booksList}
						</FormControl>
					</FormGroup>
					<Button
					onClick={this.onDelete.bind(this)}
					bsStyle="danger">Delete book</Button>
				</Panel>
			</Well>
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
		postBooks : postBooks,
		deleteBook : deleteBook
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
