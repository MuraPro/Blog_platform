import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '../header';
import classes from './layout.module.css';

const Layout = () => (
  <div className={classes.wrapper}>
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Header />
    <main>
      <section>
        <Outlet />
      </section>
    </main>
  </div>
);

export default Layout;
