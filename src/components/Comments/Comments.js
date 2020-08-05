import React from 'react';
import PropTypes from 'prop-types';
import styles from './Comments.module.css';

const Comments = () => (
  <div className={styles.Comments} data-testid="Comments">
    Comments Component
  </div>
);

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
