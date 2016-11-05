import React from 'react';
import { Menu, MainButton, ChildButton } from 'react-mfb';
import styles from './ActionButton.scss';
import css from 'react-mfb/mfb.css';

export default () => {
    return (
        <Menu effect='zoomin' position='br' method='click'>
            <MainButton
                iconResting="ion-plus-round"
                iconActive="ion-close-round" />
            <ChildButton
                icon="ion-social-github"
                label='Nyt møde' />
            <ChildButton
                icon="ion-social-github"
                label='Ny mødetype' />
            <ChildButton
                icon="ion-social-github"
                label='Ny rolle' />
        </Menu>
    );
}