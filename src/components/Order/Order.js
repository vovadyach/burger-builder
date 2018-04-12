import React from 'react'

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })

    }

    const ingredientOuput = ingredients.map(ing => {
        return <span
            key={ing.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '8px',
                border: '1px solid #ccc'
            }}>{ing.name} ({ing.amount})</span>;
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOuput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;