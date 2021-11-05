import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from './buttons';

export const SectionList = (props) => {
    const { position, className } = props;

    return <div className={`section-list__wrapper bordered-${position} ${className}`}>{props.children}</div>;
};

SectionList.propTypes = {
    position: PropTypes.oneOf(['', 'left', 'right']),
    className: PropTypes.string,
};

SectionList.defaultProps = {
    position: '',
    className: '',
};

export const SectionListHeader = (props) => {
    const search_input_ref = React.useRef(null);

    const { title, searchPlaceHolder, search, onChange, onValidate, propose } = props;

    const [show_search, showSearch] = React.useState(false);

    function showInputSearch() {
        showSearch(true);
        setTimeout(() => {
            search_input_ref.current.focus();
        }, 200);
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') onValidate(e.target.value);
    }

    return (
        <div className={`section-list__header bordered-bottom`}>
            <input
                ref={search_input_ref}
                className={`w-100 ${show_search ? '' : 'hide'}`}
                type="search"
                name="search"
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={() => showSearch(false)}
                placeholder={searchPlaceHolder}
            />
            <div className={`text-title w-100 ${show_search ? 'hide' : ''}`}>{title}</div>
            {search && !show_search ? (
                <IconButton onClick={showInputSearch} color={'white'}>
                    <i className="fi fi-rr-search"></i>
                </IconButton>
            ) : (
                <></>
            )}
            {props.children}
        </div>
    );
};

SectionListHeader.propTypes = {
    title: PropTypes.string,
    searchPlaceHolder: PropTypes.string,
    search: PropTypes.bool,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    propose: PropTypes.bool,
};

SectionListHeader.defaultProps = {
    title: '',
    searchPlaceHolder: '',
    search: false,
    onChange: () => {},
    onValidate: () => {},
    propose: false,
};

export const SectionListContent = (props) => {
    return <div className={`section-list__content p-15`}>{props.children}</div>;
};

export const SectionListItem = (props) => {
    const { selected, withOptions, onDelete, onEdit } = props;
    return (
        <div className={`section-list__item ${selected ? 'active' : ''} p-10`}>
            {props.children}
            {withOptions ? (
                <div className="options">
                    <IconButton onClick={onEdit} color="white">
                        <i className="fi fi-rr-pencil text-primary"></i>
                    </IconButton>
                    <IconButton onClick={onDelete} color="white">
                        <i className="fi fi-rr-trash text-danger"></i>
                    </IconButton>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

SectionListItem.propTypes = {
    selected: PropTypes.bool,
    withOptions: PropTypes.bool,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
};

SectionListItem.defaultProps = {
    selected: false,
    withOptions: false,
    onDelete: () => {},
    onEdit: () => {},
};
