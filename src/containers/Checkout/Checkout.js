import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            beacon: 1,
            cheese: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];             
        }
    
        this.setState({ingredients: ingredients});    
    }

    purchaseCancelHandler = () => {
        this.props.history.goBack();
    }

    purchaseContinueHandler = () => {
        this.props.history.replace('/checkout/continue-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCanceled={this.purchaseCancelHandler}
                checkoutContinued={this.purchaseContinueHandler} />
            </div>
        );
    }
}

export default Checkout;