import React, { useEffect, useState } from 'react';
import styles from './CommentInfo.module.css';
import { Editor, EditorState, convertFromRaw } from "draft-js";


const CommentInfo = (props) => {

  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(props.comment);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    console.log(props);
    setLoading(true);
    if (props.comment) {
      setComment(props.comment);
      const contentConverted = JSON.parse(comment);
      const contentState = convertFromRaw(contentConverted);
      setEditorState(EditorState.createWithContent(contentState)); //Contenido del Requerimiento
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.CommentInfo} data-testid="CommentInfo">
      {!loading && <Editor editorState={editorState} readOnly />}
    </div>
  );
}

CommentInfo.defaultProps = {};

export default CommentInfo;
