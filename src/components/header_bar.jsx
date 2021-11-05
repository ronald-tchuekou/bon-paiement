import React from 'react';
import PropTypes from 'prop-types';
import { NotificatoinBar } from './notications_bar';

export const HeaderBar = (props) => {
    const { current } = props;

    const [show, setShow] = React.useState(false);
    const [notifications, setNofications] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

    return (
        <div className="header-bar__wrapper bordered-bottom">
            <div className="title">{current}</div>
            <div className="header-bar__options">
                <div className="header-options">
                    <button onClick={() => setShow(true)} className="btn icon-btn lg">
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
            <NotificatoinBar
                notifications={notifications}
                removeAll={() => setNofications([])}
                show={show}
                close={() => setShow(false)}
            />
        </div>
    );
};

HeaderBar.propTypes = {
    current: PropTypes.string,
};
HeaderBar.defaultProps = {
    current: 'Home Page',
};
