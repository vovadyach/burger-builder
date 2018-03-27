import React from 'react';

import BurgerLogo from '../../assets/images/127burger-logo.png'
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt="BuilderLogo" />
    </div>
);


export default logo;