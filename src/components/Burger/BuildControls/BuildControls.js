import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {   
            controls.map( (ctrl, index) => (
                <BuildControl 
                    key={ctrl.label + index} 
                    label={ctrl.label} 
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)} 
                    disabled={props.disabledInfo[ctrl.type]} />
            ))
        }
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'Please, sign up first'}</button>
    </div>
);

export default buildControls;