import React from 'react';
import { Menu, MainButton, ChildButton } from 'react-mfb';
import styles from './ActionButton.scss';
import css from 'react-mfb/mfb.css';

export default ({toggleModal}) => {
    return (
        <Menu effect='zoomin' position='br' method='click'>
            <MainButton
                iconResting="ion-plus-round"
                iconActive="ion-close-round" />
            <ChildButton
                icon="ion-ios-people"
                label='Nyt møde'
                onClick={()=>toggleModal('meetingModal')}/>
            <ChildButton
                icon="ion-ios-browsers-outline"
                label='Ny mødetype'
                onClick={()=>toggleModal('typeModal')}/>
            <ChildButton
                icon="ion-person-add"
                label='Ny rolle'
                onClick={()=>toggleModal('roleModal')}/>
        </Menu>
    );
}