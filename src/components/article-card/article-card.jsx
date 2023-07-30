/* eslint-disable */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Checkbox, Box, Button } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import ModalWindow from '../modal-window';
import ReactMarkdown from 'react-markdown';
import formatDate from '../../utilites/formatDate';
import {
  fetchSetFavoriteArticle,
  fetchDeleteFavoriteArticle,
  fetchDeleteArticle,
} from '../../store/slices/articleSlice';
import avatar from '../../icons/avatar.png';
import * as selector from '../../store/selectors/selectors';
import classes from './article-card.module.css';

function verificationTag(item) {
  if (item.length < 20) {
    return item;
  } else if (item.length === 0) {
    return null;
  } else {
    return 'Avatar';
  }
}

function ArticleCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { article, singlePage } = props;
  const userCreatorArticle = article.author.username;
  const userLoggedIn = useSelector(selector.userLoggedIn);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(article?.favorited || false);
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount);

  const closeModal = () => setModalIsOpen(false);
  const openModal = () => setModalIsOpen(true);

  const handleCheckboxClick = (event) => {
    if (event.target.checked) {
      dispatch(fetchSetFavoriteArticle(article.slug));
      setCheckFavorite(true);
      setFavoriteCount(favoriteCount + 1);
    } else {
      dispatch(fetchDeleteFavoriteArticle(article.slug));
      setCheckFavorite(false);
      setFavoriteCount(favoriteCount - 1);
    }
  };

  const deleteArticle = () => {
    dispatch(fetchDeleteArticle(article.slug));
    setModalIsOpen(false);
    navigate('/articles', { replace: true });
  };

  return (
    <article>
      <div className={classes.article_text}>
        <div className={classes.article_title}>
          <NavLink to={`/articles/${article.slug}`}>
            <h1>{article.title.slice(0, 30) || 'Example'}</h1>
          </NavLink>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
            disabled={!userLoggedIn}
            checked={checkFavorite}
            onClick={(event) => handleCheckboxClick(event)}
          />
          {favoriteCount}
        </div>
        <div className={classes.article_tags}>
          {article.tagList.map((tag) => tag && <span key={nanoid()}>{verificationTag(tag)}</span>)}
        </div>
        <p>{article.description}</p>

        {singlePage && (
          <div className={classes.article_content}>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        )}
      </div>
      <div className={classes.article_avatar}>
        <div className={classes.article_avatar_info}>
          <h2>{article.author.username}</h2>
          <span>{formatDate(article.createdAt)}</span>
        </div>
        <div className={classes.article_avatar_img}>
          <img src={article.author.image || avatar} alt="avatar" />
        </div>
        {singlePage && userLoggedIn === userCreatorArticle && (
          <Box>
            <Button
              color="error"
              variant="outlined"
              sx={{ textTransform: 'none', mr: 2 }}
              onClick={openModal}>
              Delete
            </Button>
            <Link to="edit" style={{ textDecoration: 'none' }}>
              <Button color="success" variant="outlined" sx={{ textTransform: 'none' }}>
                Edit
              </Button>
            </Link>
          </Box>
        )}
      </div>

      <ModalWindow
        modalIsOpen={modalIsOpen}
        handleCloseModal={closeModal}
        handleClickDelete={deleteArticle}
      />
    </article>
  );
}

export default ArticleCard;
