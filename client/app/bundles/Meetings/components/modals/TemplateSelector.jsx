import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default ({onSelectChange, selected, templates}) => {
    const items = templates.map((template)=>{
        return (<MenuItem key={template.get('id')} value={template.get('id')} primaryText={template.get('name')} />);
    });

    return (
        <SelectField
            floatingLabelText="Mødetype"
            value={selected}
            onChange={onSelectChange}
            >
            {items}
        </SelectField>
    );
};