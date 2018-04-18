import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://react-burger-builder-cd933.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState( {error: true} );
        //     })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    closePurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaseHandler = () => {
        this.props.history.push('/checkout');
        
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + this.props.ings[i]);
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString

        // });
    }

    updatPurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        // this.setState({ purchasable: sum > 0 });
        return sum > 0;

    }

    addIngredienthandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };

        // updatedIngredients[type] = updatedCount

        // const priceAddition = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition

        // this.setState({
        //     totalPrice: newPrice,
        //     ingredients: updatedIngredients
        // })
        // this.updatPurchaseState(updatedIngredients);
    }

    removeIngredienthandler = (type) => {
        // const oldCount = this.state.ingredients[type];

        // if (oldCount <= 0) {
        //     return;
        // }

        // const updatedCount = oldCount - 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };

        // updatedIngredients[type] = updatedCount

        // const priceDeduction = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice - priceDeduction

        // this.setState({
        //     totalPrice: newPrice,
        //     ingredients: updatedIngredients
        // })
        // this.updatPurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>The data can not be loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BurgerControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.updatPurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}  
                        disabledInfo={disabledInfo}
                        price={this.props.price} />
                </Aux>
            );

            orderSummary = <OrderSummary
                price={this.props.price}
                purchaseClosed={this.closePurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler}
                ingredients={this.props.ings} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} purchaseClosed={this.closePurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));