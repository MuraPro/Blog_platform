import React from 'react';
import { Link } from 'react-router-dom';
import icon from './icon-error.png';
import classes from './error-indicator.module.css';

function ErrorIndicator() {
  return (
    <div className={classes.indicator}>
      <img src={icon} alt={classes.icon} />
      <span className={classes.boom}>Warning!</span>
      <span>Something has gone terribly wrong!</span>
      <span>
        Try going to the{' '}
        <Link to="/articles" className={classes.main_page}>
          Main page.
        </Link>
      </span>
    </div>
  );
}

export default ErrorIndicator;
