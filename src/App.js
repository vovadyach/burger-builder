import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';


const asyncCheckout = asyncComponent(() => {
    return import(Checkout);
});

const asyncOrders = asyncComponent(() => {
    return import(Orders);
});

const asyncAuth = asyncComponent(() => {
    return import(Auth);
});


class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
 
        let routes = (
            <Switch>
                <Route path='/authentification' component={asyncAuth} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        );

        if (this.props.isAuthinticated) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={asyncCheckout} />
                    <Route path='/orders' component={asyncOrders} />
                    <Route path='/authentification' component={asyncAuth} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthinticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
