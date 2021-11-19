import React from 'react';
import PropTypes from 'prop-types';

export const FilesChooser = (props) => {
    const { onChange, label, description } = props;
    React.useEffect(() => {
        require('../scripts/files_chooser');
    });
    return (
        <div className="file-chooser__container">
            <input
                multiple
                type="file"
                name="files"
                label={label}
                description={description}
                onChange={onChange}
                id="files"
                is="files-chooser"
            />
        </div>
    );
};
FilesChooser.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    description: PropTypes.string,
};
FilesChooser.defaultProps = {
    onChange: () => {},
    label: 'Glisser ou Cliquer',
    description: 'Glisser des fichiers ou cliquer pour sélectionner des fichiers.',
};
