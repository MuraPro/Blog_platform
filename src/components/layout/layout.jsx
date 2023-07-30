import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header';
import classes from './layout.module.css';

const Layout = () => (
  <div className={classes.wrapper}>
    <Header />
    <main>
      <section>
        <Outlet />
      </section>
    </main>
  </div>
);

export default Layout;
