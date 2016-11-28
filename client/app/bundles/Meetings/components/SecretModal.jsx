import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import styles from './SecretModal.scss';

export default class extends React.Component {
    render () {
        let actions = (<FlatButton onClick={this.props.close}>Luk</FlatButton>);
        let code = null;
        if(this.props.token) code = (<span>{this.props.token.get('code')}</span>);
        return (
            <Dialog open={this.props.open} actions={actions} >
                <div className={styles.content}>
                    <h2>Tilmeldingskode</h2>
                    {code}
                </div>
            </Dialog>
        );
    }
}