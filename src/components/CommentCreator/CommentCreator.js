import React from 'react';
import PropTypes from 'prop-types';
import styles from './CommentCreator.module.css';

const CommentCreator = () => (
  <div className={styles.CommentCreator} data-testid="CommentCreator">
    CommentCreator Component
  </div>
);

CommentCreator.propTypes = {};

CommentCreator.defaultProps = {};

export default CommentCreator;
