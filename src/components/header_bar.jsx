import React from 'react';
import PropTypes from 'prop-types';

export const HeaderBar = (props) => {
    const { current } = props;

    return (
        <div className="header-bar__wrapper bordered-bottom">
            <div className="title">{current}</div>
            <div className="header-bar__options">
                <div className="header-options">
                    <button className="btn icon-btn lg">
                        <i className="fi fi-rr-bell"></i>
                    </button>
                </div>
                <div className="profile-content">
                    <div className="profile">
                        <img src="/profile.png" alt="Profile" />
                    </div>
                    <div>
                        <div className="text-default_dark">Rowera Rovenclaw</div>
                        <div className="text-default">username</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

HeaderBar.propTypes = {
    current: PropTypes.string,
};
HeaderBar.defaultProps = {
    current: 'Home Page',
};
