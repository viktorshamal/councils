import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import styles from './SecretModal.scss';

export default class extends React.Component {
    state = {
        remainder: 0,
        color: 'green'
    };

    componentDidMount() {
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        if (!this.props.token) return;

        let expiry = this.props.token.get('expires');
        let remainder = (expiry - (new Date().getTime() / 1000)).toFixed();

        let color = 'green';

        if(remainder < 10) color='yellow';

        if(remainder <= 2) {
            this.props.fetchToken(this.props.meeting_id);
        }

        this.setState({remainder,color});
    }

    render () {
        let actions = (<FlatButton onClick={this.props.close}>Luk</FlatButton>);
        let code, time = null;
        if(this.props.token){
            code = (<span>{this.props.token.get('code')}</span>);
            time = (<span className={styles.indicator}
                          style={{backgroundColor:this.state.color}}>
                    </span>);
        }
        return (
            <Dialog open={this.props.open} actions={actions} >
                <div className={styles.content}>
                    <h2>Tilmeldingskode</h2>
                    <div className={styles.code}>{code} {time}</div>
                </div>
            </Dialog>
        );
    }
}