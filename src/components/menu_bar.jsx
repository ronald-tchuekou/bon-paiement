import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Lang } from '../lang';
import { LangContext } from '../context';
import { useRouter } from 'next/router';

export const MenuBar = (props) => {
    const { current } = props;

    const router = useRouter();

    const { lang } = React.useContext(LangContext);

    const [current_item, setCurrentItem] = React.useState('');

    React.useEffect(() => {
        setCurrentItem(current);
    }, [current]);

    function goTo(path) {
        setCurrentItem(path);
        router.push('/' + path);
    }

    function logout() {
        router.push('/');
    }

    return (
        <div className="menu-bar__wrapper bordered-right">
            <div className="menu-bar-top">
                <div onClick={() => goTo('home')} className="logo cursor-pointer">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.2009 35.0813C17.4366 35.4896 18.026 35.4896 18.2618 35.0813L22.7848 27.2471C23.0206 26.8388 22.7259 26.3284 22.2544 26.3284H13.2083C12.7368 26.3284 12.4421 26.8388 12.6778 27.2471L17.2009 35.0813Z"
                            fill="#7942FB"
                        />
                        <path
                            d="M17.2009 0.918742C17.4366 0.510411 18.026 0.510412 18.2618 0.918744L22.7848 8.75286C23.0206 9.1612 22.7259 9.67161 22.2544 9.67161H13.2083C12.7368 9.67161 12.4421 9.16119 12.6778 8.75286L17.2009 0.918742Z"
                            fill="#7942FB"
                        />
                        <path
                            d="M35.0812 18.799C35.4896 18.5632 35.4896 17.9738 35.0812 17.7381L27.2471 13.2151C26.8387 12.9793 26.3283 13.274 26.3283 13.7455L26.3283 22.7916C26.3283 23.2631 26.8387 23.5578 27.2471 23.322L35.0812 18.799Z"
                            fill="#7942FB"
                        />
                        <path
                            d="M0.918756 18.799C0.510421 18.5632 0.510422 17.9738 0.918757 17.7381L8.75292 13.2151C9.16126 12.9793 9.67167 13.274 9.67167 13.7455L9.67167 22.7916C9.67167 23.2631 9.16125 23.5578 8.75292 23.322L0.918756 18.799Z"
                            fill="#7942FB"
                        />
                        <ellipse cx="18.0002" cy="17.9998" rx="5.10449" ry="5.10446" fill="#ED5B75" />
                    </svg>
                </div>
                <div className="menu-content">
                    <div className={`menu-bar-item ${current_item === 'home' ? 'active' : ''}`}>
                        <div className="menu-indicator"></div>
                        <button onClick={() => goTo('home')}>
                            <i className="fi fi-rr-home-location"></i>
                        </button>
                        <div className="text-indicator">{Lang.home[lang]}</div>
                    </div>
                    <div className={`menu-bar-item ${current_item === 'dashboard' ? 'active' : ''}`}>
                        <div className="menu-indicator"></div>
                        <button onClick={() => goTo('dashboard')}>
                            <i className="fi fi-rr-dashboard"></i>
                        </button>
                        <div className="text-indicator">{Lang.dashboard[lang]}</div>
                    </div>
                    <div className={`menu-bar-item ${current_item === 'dotation-mvt' ? 'active' : ''}`}>
                        <div className="menu-indicator"></div>
                        <button onClick={() => goTo('dotation-mvt')}>
                            <i className="fi fi-rr-box-alt"></i>
                        </button>
                        <div className="text-indicator">{Lang.dotation_mvt[lang]}</div>
                    </div>
                    <div className={`menu-bar-item ${current_item === 'manager' ? 'active' : ''}`}>
                        <div className="menu-indicator"></div>
                        <button onClick={() => goTo('manager')}>
                            <i className="fi fi-rr-briefcase"></i>
                        </button>
                        <div className="text-indicator">{Lang.manager[lang]}</div>
                    </div>
                    <div className={`menu-bar-item ${current_item === 'caisse' ? 'active' : ''}`}>
                        <div className="menu-indicator"></div>
                        <button onClick={() => goTo('caisse')}>
                            <i className="fi fi-rr-file-check"></i>
                        </button>
                        <div className="text-indicator">{Lang.caisse[lang]}</div>
                    </div>
                    <div className={`menu-bar-item ${current_item === 'settings' ? 'active' : ''}`}>
                        <div className="menu-indicator"></div>
                        <button onClick={() => goTo('settings')}>
                            <i className="fi fi-rr-settings"></i>
                        </button>
                        <div className="text-indicator">{Lang.settings[lang]}</div>
                    </div>
                </div>
            </div>
            <div className="menu-bar-item">
                <button onClick={logout} className="text-danger">
                    <i className="fi fi-rr-power text-danger"></i>
                </button>
                <div className="text-indicator">{Lang.logout[lang]}</div>
            </div>
        </div>
    );
};

MenuBar.propTypes = {
    current: PropTypes.string,
};
MenuBar.defaultProps = {
    current: '',
};
