import React from 'react';
import { Link } from 'react-router-dom';
import classes from './nod-found.module.css';
import img from '../../icons/pngegg.png';

function NotFound() {
  return (
    <div className={classes.warning}>
      <img src={img} />
      <h2>Страница не найдена</h2>
      <p>
        Страница,на которую вы пытаетесь попасть, не существует. Перейдите на{' '}
        <Link to="/articles" className={classes.notfound_link}>
          Главную страницу
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
