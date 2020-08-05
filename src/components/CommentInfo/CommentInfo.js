import React from 'react';
import PropTypes from 'prop-types';
import styles from './CommentInfo.module.css';

const CommentInfo = () => (
  <div className={styles.CommentInfo} data-testid="CommentInfo">
    CommentInfo Component
  </div>
);

CommentInfo.propTypes = {};

CommentInfo.defaultProps = {};

export default CommentInfo;
