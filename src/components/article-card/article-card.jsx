import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Checkbox, Box, Button } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import ModalWindow from '../modal-window';
import formatDate from '../../utilites/formatDate';
import {
  fetchSetFavoriteArticle,
  fetchDeleteFavoriteArticle,
  fetchDeleteArticle,
  clearArticles,
} from '../../store/slices/articleSlice';
import { $userLoggedIn, $disabled } from '../../store/slices/userSlice';
import avatar from '../../icons/avatar.png';
import classes from './article-card.module.css';

function verificationTag(item) {
  if (item.length < 20) {
    return item;
  }
  if (item.length === 0) {
    return 'Avatar';
  }
  return 'Error';
}

function ArticleCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { article, singlePage } = props;
  const { slug } = article;
  const userCreatorArticle = article.author.username;
  const userLoggedIn = useSelector($userLoggedIn);
  const disabled = useSelector($disabled);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(article?.favorited || false);
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount);

  const closeModal = () => setModalIsOpen(false);
  const openModal = () => setModalIsOpen(true);

  const handleCheckboxClick = (event) => {
    if (event.target.checked) {
      dispatch(fetchSetFavoriteArticle(slug));
      setCheckFavorite(true);
      setFavoriteCount(favoriteCount + 1);
    } else {
      dispatch(fetchDeleteFavoriteArticle(slug));
      setCheckFavorite(false);
      setFavoriteCount(favoriteCount - 1);
    }
  };

  const redirectToList = () => {
    dispatch(clearArticles());
    navigate('/articles', { replace: true });
    toast.success('Article has deleted successfully!');
    setModalIsOpen(false);
  };

  const deleteArticle = () => {
    dispatch(fetchDeleteArticle({ slug, redirectToList }));
  };

  function validateStr(str) {
    const newStr = str;
    const capitalized = newStr.charAt(0).toUpperCase() + newStr.slice(1);
    return capitalized.slice(0, 30);
  }

  return (
    <article>
      <div className={classes.article_text}>
        <div className={classes.article_title}>
          <NavLink to={`/articles/${article.slug}`}>
            <h1>{validateStr(article.title) || 'Example'}</h1>
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
          <Box className={classes.article_avatar_btn}>
            <Button
              disabled={disabled}
              color="error"
              variant="outlined"
              sx={{ textTransform: 'none', mr: 2 }}
              onClick={openModal}>
              Delete
            </Button>
            <Link to="edit" style={{ textDecoration: 'none' }}>
              <Button
                disabled={disabled}
                color="success"
                variant="outlined"
                sx={{ textTransform: 'none' }}>
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

ArticleCard.propTypes = {
  article: PropTypes.object,
  singlePage: PropTypes.bool,
};

ArticleCard.defaultProps = {
  article: {},
  singlePage: false,
};

export default ArticleCard;
