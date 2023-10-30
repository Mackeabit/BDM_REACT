import React from 'react';
import styles from './ProjectComponent.module.css';

function ProjectComponent(props) {
  return (
    <div
      className={`${styles.container} project-component ${props.isSelected ? 'selected' : ''}`}
      style={{ animationDelay: props.animationDelay }}
      onClick={props.onClick}
    >
      <div className={styles.title}>{props.title}</div>
      <div className={styles.description}>{props.description}</div>
      <div className={styles.details}>
        <div className={styles.label}>{props.role}</div>
        <div className={styles.value}>{props.time}</div>
      </div>
    </div>
  );
}

export default ProjectComponent;
