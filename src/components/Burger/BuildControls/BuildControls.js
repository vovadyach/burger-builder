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
        {
            controls.map( (ctrl, index) => (
                
                <BuildControl key={ctrl.label + index} label={ctrl.label} />
            ))
        }
    </div>
    
    
);

export default buildControls;