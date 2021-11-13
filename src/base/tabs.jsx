import React from 'react';
import PropTypes from 'prop-types';

export const Tab = (props) => {
    return <div className="tabs__wrapper">{props.children}</div>;
};

export const TabHeader = (props) => {
    return <div className="tabs__header">{props.children}</div>;
};

export const TabHeaderItem = (props) => {
    const { title, active, onClick } = props;
    return (
        <div onClick={onClick} className={`tabs__header-item ${active ? 'active' : ''}`}>
            <div className="tabs__header-title">
                {props.children}
                <span>&nbsp;</span>
                {title}
            </div>
            <div className="tabs__header-indicator"></div>
        </div>
    );
};
TabHeaderItem.propTypes = {
    title: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func,
};
TabHeaderItem.defaultProps = {
    title: '',
    active: false,
    onClick: () => {},
};

export const TabContent = (props) => {
    return <div className={`tabs__content`}>{props.children}</div>;
};

export const TabContentItem = (props) => {
    const { active } = props;
    return <div className={`tabs__content-item ${active ? 'active' : ''}`}>{props.children}</div>;
};
TabContentItem.propTypes = {
    active: PropTypes.bool,
};
TabContentItem.defaultProps = {
    active: false,
};
