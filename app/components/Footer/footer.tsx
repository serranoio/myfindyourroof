import React from 'react';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <h1 className={styles.title}>FindYourRoof</h1>
          <p className={styles.description}>Join us in our mission to build a future where everyone has a place to call home. Together, we can make a difference, one roof at a time.</p>
          <div className={styles.socialsGrid}>
            <img className={styles.socialsImg} src="/socials/fbIcon.png"></img>
            <img className={styles.socialsImg} src="/socials/igIcon.png"></img>
            <img className={styles.socialsImg} src="/socials/twitterIcon.png"></img>
          </div>
        </div>
        <div className={styles.gridItem}>
          <h1 className={styles.title}>Head Office</h1>
          <h2 className={styles.title2}>Address</h2>
          <p className={styles.description}>1200 W Harrison St, Chicago, IL 60607</p>
          <h2 className={styles.title2}>Email</h2>
          <p className={styles.description}>findyourroof@yahoo.com</p>
          <h2 className={styles.title2}>Phone</h2>
          <p className={styles.description}>+1 (312) 996-7000</p>
        </div>
        <div className={styles.gridItem}>
          <h1 className={styles.title}>Navigation</h1>
          <p className={styles.description}>Housing</p>
          <p className={styles.description}>Jobs</p>
          <p className={styles.description}>Documents</p>
          <p className={styles.description}>Chippy</p>
        </div>
      </div>
      <hr className={styles.borderBreak}/>
      <div className={styles.copyright}>
        <p>&copy; 2024 FindYourRoof. All rights reserved.</p>
      </div>
    </footer>
  );
};


export default Footer; 