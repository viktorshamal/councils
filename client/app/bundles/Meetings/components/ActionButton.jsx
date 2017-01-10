import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

let style = {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem'
};

export default ({toggleModal}) => {
    return (
        <FloatingActionButton secondary={true} style={style} onClick={()=>toggleModal('meetingModal')}>
            <ContentAdd />
        </FloatingActionButton>
    );

}