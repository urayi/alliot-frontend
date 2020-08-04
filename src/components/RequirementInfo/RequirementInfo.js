import React from 'react';
import PropTypes from 'prop-types';
import styles from './RequirementInfo.module.css';

const RequirementInfo = () => (
  <div className={styles.RequirementInfo} data-testid="RequirementInfo">
    RequirementInfo Component
  </div>
);

RequirementInfo.propTypes = {};

RequirementInfo.defaultProps = {};

export default RequirementInfo;
