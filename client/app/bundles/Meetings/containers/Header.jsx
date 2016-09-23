import React from 'react';
import styles from './Header.scss';

export default () => {
    return (
        <div className={styles.main}>
            <span className={styles.logo}>Gefions Elevråd</span>
            <span className={styles.right}>Log in</span>
        </div>
    );
}