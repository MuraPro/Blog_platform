import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { logOut, $userName, $userAvatar, resetUserError } from '../../store/slices/userSlice';
import { clearArticleRequestStatus } from '../../store/slices/articleSlice';
import avatarPicture from '../../icons/avatar.png';
import classes from './header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userName = useSelector($userName) || 'Jon Doe';
  const userAvatar = useSelector($userAvatar) || avatarPicture;
  const auth = sessionStorage.getItem('auth');

  const handleLogOutClick = () => {
    dispatch(logOut());
    dispatch(clearArticleRequestStatus());
    toast.info('You have logged out successfully');
  };

  const handleReset = () => {
    dispatch(resetUserError());
  };

  return (
    <header>
      <div className={classes.header_container}>
        <div className={classes.label}>
          <Link style={{ flexGrow: 1 }} to="/articles" className={classes.label_link}>
            Realworld Blog
          </Link>
        </div>

        {!auth && (
          <div className={classes.signs}>
            <Link
              to="/sign-in"
              style={{ textDecoration: 'none' }}
              className={classes.sign_in}
              onClick={handleReset}>
              Sign In
            </Link>

            <Link
              to="/sign-up"
              style={{ textDecoration: 'none' }}
              className={classes.sign_up}
              onClick={handleReset}>
              Sign Up
            </Link>
          </div>
        )}
        {auth && (
          <div className={classes.signs}>
            <Link to="/new-article" className={classes.sign_up}>
              Create article
            </Link>
            <Link to="/profile" className={classes.user_name}>
              {userName}
            </Link>
            <Link to="/profile" className={classes.user_avatar}>
              <Avatar alt="Avatar" src={userAvatar} sx={{ width: 46, height: 46 }} />
            </Link>
            <Link
              to="/articles"
              className={classes.sign_logout}
              onClick={handleLogOutClick}
              state={location.pathname}>
              Log Out
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
