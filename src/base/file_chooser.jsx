import React from 'react';
import PropTypes from 'prop-types';
require('../scripts/files_chooser');

export const FilesChooser = (props) => {
    const { onChange } = props;
    return (
        <div className="file-chooser__container">
            <input type="file" name="files" onChange={onChange} id="files" is="files-chooser" />
        </div>
    );
};
FilesChooser.propTypes = {
    onChange: PropTypes.func,
};
FilesChooser.defaultProps = {
    onChange: () => {},
};
