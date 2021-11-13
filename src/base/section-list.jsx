import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from './buttons';
import { AddLoader } from '../scripts/app';

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

    const { title, searchPlaceHolder, search, onChange, onValidate, propose, showBackPress, onBackPress } = props;

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
            {showBackPress ? (
                <IconButton onClick={onBackPress} color={'white'}>
                    <i className="fi fi-rr-arrow-small-left t-25"></i>
                </IconButton>
            ) : (
                <></>
            )}
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
    showBackPress: PropTypes.bool,
    onBackPress: PropTypes.func,
};

SectionListHeader.defaultProps = {
    title: '',
    searchPlaceHolder: '',
    search: false,
    onChange: () => {},
    onValidate: () => {},
    propose: false,
    showBackPress: false,
    onBackPress: () => {},
};

export const SectionListContent = React.forwardRef(
    (props, ref) => {
        const { className } = props;
        const loader_ref = React.useRef(null);

        const [loader, setLoader] = React.useState(undefined);

        React.useEffect(() => {
            setLoader(AddLoader(loader_ref.current));
        }, []);

        React.useImperativeHandle(ref, () => ({
            showLoader: () => {
                if (loader) loader.show();
            },
            dismissLoader: () => {
                if (loader) loader.dismiss();
            },
        }));

        return (
            <div ref={loader_ref} className={`section-list__content ${className}`}>
                {props.children}
            </div>
        );
    },
    { displayName: 'SectionListContent' }
);

export const SectionListItem = (props) => {
    const { selected, withOptions, onDelete, onEdit } = props;
    return (
        <div className={`section-list__item ${selected ? 'active' : ''} p-10`}>
            {props.children}
            {withOptions ? (
                <div className="options">
                    {onEdit ? (
                        <IconButton onClick={onEdit} color="white">
                            <i className="fi fi-rr-pencil text-primary"></i>
                        </IconButton>
                    ) : (
                        <></>
                    )}
                    {onDelete ? (
                        <IconButton onClick={onDelete} color="white">
                            <i className="fi fi-rr-trash text-danger"></i>
                        </IconButton>
                    ) : (
                        <></>
                    )}
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
    onDelete: undefined,
    onEdit: undefined,
};
