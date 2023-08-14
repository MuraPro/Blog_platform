import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { nanoid } from 'nanoid';
import { $disabled } from '../../store/slices/articleSlice';

const ArticleForm = ({ article, handlerFormSubmit }) => {
  const disabled = useSelector($disabled);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Поле "Title" должно быть заполнено'),
    description: Yup.string().required('Поле "Short description" должно быть заполнено'),
    text: Yup.string().required('Поле "Text" должно быть заполнено'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      text: article?.body || '',
    },
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const [tagList, setTagList] = useState(article?.tagList || []);
  const [tagValue, setTagValue] = useState('');

  const onSubmit = (data) => {
    handlerFormSubmit({ ...data }, tagList);
  };

  const handleClickAddTag = () => {
    setTagList([...tagList, tagValue]);
    setTagValue('');
  };

  const handleClickDeleteTag = (id) => {
    setTagList(tagList.filter((_, index) => index !== id));
  };

  return (
    <Container
      sx={{
        m: 'auto',
        maxWidth: '1440px',
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            p: 5,
          }}>
          <Typography
            variant="h6"
            justify="center"
            align="center"
            sx={{
              mb: 1,
            }}>
            Create new article
          </Typography>

          <TextField
            id="title"
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            required
            sx={{
              mb: 1,
            }}
            {...register('title')}
            error={!!errors?.title}
            helperText={errors?.title?.message}
          />

          <TextField
            id="description"
            label="Short description"
            variant="outlined"
            size="small"
            fullWidth
            required
            sx={{
              mb: 1,
            }}
            {...register('description')}
            error={!!errors?.description}
            helperText={errors?.description?.message}
          />

          <TextField
            id="text"
            label="Text"
            variant="outlined"
            minRows={6}
            multiline
            fullWidth
            required
            sx={{
              mb: 1,
            }}
            {...register('text')}
            error={!!errors?.text}
            helperText={errors?.text?.message}
          />
          <Typography>Tags</Typography>

          {tagList &&
            tagList.map((item, id) => (
              <Box key={nanoid()} sx={{ mb: 2 }}>
                <TextField disabled id={item} value={item} size="small" sx={{ mr: 2 }} />

                <Button
                  disabled={disabled}
                  variant="outlined"
                  color="error"
                  sx={{
                    textTransform: 'none',
                  }}
                  onClick={() => handleClickDeleteTag(id)}>
                  Delete
                </Button>
              </Box>
            ))}

          {/* поле создания тега */}
          <TextField
            id="tag"
            value={tagValue}
            variant="outlined"
            size="small"
            sx={{
              mr: 1,
            }}
            onChange={(event) => {
              setTagValue(event.target.value);
            }}
          />

          <Button
            disabled={disabled}
            variant="outlined"
            sx={{
              mb: 2,
              textTransform: 'none',
            }}
            onClick={handleClickAddTag}>
            Add Tag
          </Button>
          <Divider sx={{ mb: 2 }} />
          <Button
            disabled={disabled}
            type="submit"
            variant="contained"
            sx={{
              mb: 2,
              textTransform: 'none',
              width: '50%',
            }}>
            Send
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

ArticleForm.propTypes = {
  article: PropTypes.object,
  singlePage: PropTypes.bool,
  handlerFormSubmit: PropTypes.func,
};

ArticleForm.defaultProps = {
  article: {},
  singlePage: false,
  handlerFormSubmit: () => {},
};

export default ArticleForm;
