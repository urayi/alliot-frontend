import React from 'react';
import PropTypes from 'prop-types';
import styles from './CommentInfo.module.css';

const CommentInfo = (props) => {
  return (
    <div className={styles.CommentInfo} data-testid="CommentInfo">
      {props.comment}
    </div>
  );
}

CommentInfo.propTypes = {};

CommentInfo.defaultProps = {};

export default CommentInfo;
