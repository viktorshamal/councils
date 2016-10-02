import React from 'react';
import styles from './Header.scss';

import { OAuthSignInButton, SignOutButton } from 'redux-auth/material-ui-theme';

export default ({user}) => {
    var button;

    if (user.get('isSignedIn')) {
        button = <SignOutButton>Log ud</SignOutButton>
    } else {
        button = <OAuthSignInButton provider="google" >Log in</OAuthSignInButton>
    }

    return (
        <div className={styles.main}>
            <span className={styles.logo}>Gefions Elevråd</span>
            <span className={styles.right}>
                {user.getIn(['attributes', 'name'])}
                {button}
            </span>
        </div>
    );
}