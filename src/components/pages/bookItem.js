import React from 'react';
import { Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart } from '../../actions/cartAction';

class BookItem extends React.Component {
	handleItemSubmit() {
		const book = {
			'_id' : this.props._id,
			'title' : this.props.title,
			'description' : this.props.description,
			'price' : this.props.price,
			'quantity' : 1
		};

		this.props.addToCart(book);
	}

	render() {
		return(
			<Well>
				<Row>
					<Col xs={12}>
						<h6>{this.props.title}</h6>
						<p>{this.props.description}</p>
						<h6>Rs. {this.props.price}</h6>
						<Button
						onClick={this.handleItemSubmit.bind(this)}
						bsStyle="primary">Buy Now</Button>
					</Col>
				</Row>
			</Well>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addToCart : addToCart
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(BookItem);