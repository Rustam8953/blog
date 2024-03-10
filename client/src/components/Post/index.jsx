import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import './post.css';

import { UserInfo } from '../UserInfo';

export const Post = ({
  _id,
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
}) => {

  const onClickRemove = () => {};

  return (
    <div className={clsx('root', { 'rootFull': 'isFullPost' })}>
      {isEditable && (
        <div className='editButtons'>
          <a href={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </a>
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
            {isFullPost ? title : <a href={`/posts/${_id}`}>{title}</a>}
          </h2>
          <ul className='tags'>
            {tags.map((name) => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
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