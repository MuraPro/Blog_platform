import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { logOut } from '../../store/slices/userSlice';
import avatarPicture from '../../icons/avatar.png';
import { clearArticleRequestStatus } from '../../store/slices/articleSlice';
import * as selector from '../../store/selectors/selectors';
import classes from './header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userName = useSelector(selector.userName) || 'Jon Doe';
  const auth = useSelector(selector.auth);
  const userAvatar = useSelector(selector.userAvatar) || avatarPicture;

  const fromPage = location.state?.from?.pathname || '/';

  const handleLogOutClick = () => {
    dispatch(clearArticleRequestStatus());
    dispatch(logOut());
    navigate(fromPage, { replace: true });
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
              state={{ from: location }}
              className={classes.sign_in}>
              Sign In
            </Link>

            <Link to="/sign-up" style={{ textDecoration: 'none' }} className={classes.sign_up}>
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
            <button type="button" className={classes.sign_logout} onClick={handleLogOutClick}>
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
