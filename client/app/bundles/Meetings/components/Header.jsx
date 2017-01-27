import React from 'react';
import styles from './Header.scss';

import IconButton from 'material-ui/IconButton';
import More from 'material-ui/svg-icons/navigation/more-vert';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { OAuthSignInButton, SignOutButton } from 'redux-auth/material-ui-theme';

export default ({user,council}) => {
    var button;

    if (user.get('isSignedIn')) {
        button = <SignOutButton>Log ud</SignOutButton>
    } else {
        button = <OAuthSignInButton provider="google" >Log in</OAuthSignInButton>
    }

    let name = user.getIn(['attributes', 'name']);
    console.log(council.get('name'));
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <span className={styles.logo}>{council.get('name')}</span>
                <span className={styles.right}>
                    <p>{name}</p>
                    {button}
                </span>
            </div>
        </div>
    );
}
//                <PopoverExampleSimple name={name} />

class PopoverExampleSimple extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        return (
            <span className={styles.rightMobile}>
                <IconButton onTouchTap={this.handleTouchTap}>
                    <More color={'black'}/>
                </IconButton>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                    <Menu>
                        <MenuItem primaryText={this.props.name} />
                        <MenuItem primaryText="Log ud" />
                    </Menu>
                </Popover>
            </span>
        );
    }
}