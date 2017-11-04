import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import { deleteCartItem, incrementItem, decrementItem } from '../../actions/cartAction';

class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal : false,
			total : 0
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.calculateTotalCost = this.calculateTotalCost.bind(this);
	}

	changeQuantity(action, item) {
		if (action === 'add') {
			this.props.incrementItem(item);
		} else {
			this.props.decrementItem(item);
		}
	}

	deleteItem(item) {
		this.props.deleteCartItem(item);
	}

	renderEmpty() {
		return(<div></div>);
	}

	toggleModal() {
		this.setState({
			showModal : !this.state.showModal
		});
	}

	calculateTotalCost() {
		let item, totalCost = 0;
		for (let i = 0 ; i < this.props.cart.length ; i++) {
			item = this.props.cart[i];
			totalCost += (item['price'] * item['quantity']);
		}
		this.setState({
			total : totalCost
		});
	}

	renderCart() {
		const self = this;
		const cartItemList = this.props.cart.map(function(item) {
			return(
				<Panel key={item._id}>
					<Row>
						<Col xs={12} sm={4}>
							<h6>{item.title}</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>{item.price}</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>Qty: <Label bsStyle="success">{item.quantity}</Label></h6>
						</Col>
						<Col xs={6} sm={4}>
							<ButtonGroup style={{minWidth:'300px'}}>
								<Button onClick={this.changeQuantity.bind(this, 'subtract', item)} bsStyle="default" bsSize="small">-</Button>
								<Button onClick={this.changeQuantity.bind(this, 'add', item)} bsStyle="default" bsSize="small">+</Button>
								<span> </span>
								<Button onClick={this.deleteItem.bind(this, item)} bsStyle="danger" bsSize="small">DELETE</Button>
							</ButtonGroup>
 						</Col>
					</Row>
				</Panel>
			);
		}, this);

		return(
			<Panel header="Cart" bsStyle="primary">
				{cartItemList}
				<Row>
					<Col xs={12}>
						<h6>Total amount:</h6>
						<Button
							onClick={(event) => {self.toggleModal(); self.calculateTotalCost();}}
							bsStyle="success" bsSize="small">
							PROCEED TO CHECKOUT
						</Button>
					</Col>
				</Row>
				<Modal show={this.state.showModal}
					onHide={this.toggleModal.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>Thank you!</Modal.Title>
					</Modal.Header>
					<Modal.Body>
					<h6>Your order has been saved</h6>
					<p>You will receive an email confirmation</p>
					</Modal.Body>
					<Modal.Footer>
						<Col xs={6}>
						<h6>total Rs: {this.state.total}</h6>
						</Col>
					<Button
						onClick={this.toggleModal.bind(this)}>Close</Button>
					</Modal.Footer>
				</Modal>
			</Panel>
		);
	}

	render() {
		if (this.props.cart.length === 0) {
			return this.renderEmpty();
		} else {
			return this.renderCart();
		}
	}
}

function mapStateToProps(state) {
	return {
		cart : state.cart.cart
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		deleteCartItem : deleteCartItem,
		incrementItem : incrementItem,
		decrementItem : decrementItem
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
