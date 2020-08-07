import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './Comments.module.css';
import CommentCreator from '../CommentCreator/CommentCreator';


const Comments = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.Comments} data-testid="Comments">
      <CommentCreator requirement={props.requirement}/>
    </div>
  );
}

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
