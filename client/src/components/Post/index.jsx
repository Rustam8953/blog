import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from 'react-router-dom';
import style from './post.css';

import './post.css';

import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './PostSkeleton';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isEditable,
  isLoading
}) => {
  if (isLoading) {
    return <PostSkeleton />;
  }
  const onClickRemove = () => {};

  return (
    <div className={clsx('root-post', { 'rootFull': 'isFullPost' })}>
      {isEditable && (
        <div className='editButtons'>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx('image', { 'imageFull': 'isFullPost' })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className='wrapper'>
        <UserInfo {...user} additionalText={createdAt} />
        <div className='indention'>
          <h2 className={clsx('title', { 'titleFull': 'isFullPost' })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className='tags'>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className='content'>{children}</div>}
          <ul className='postDetails'>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};