import React from 'react';
import PropTypes from 'prop-types';

export const Checkbox = (props) => {
    const { label, onClick, checked } = props;
    return (
        <div className="checkbox__wrapper">
            <div onClick={() => onClick()} className="checkbox__content">
                {checked ? (
                    <div className="state check-state">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.83329 1.66675C4.72822 1.66675 3.66842 2.10574 2.88701 2.88714C2.10561 3.66854 1.66663 4.72835 1.66663 5.83342V14.1668C1.66663 15.2718 2.10561 16.3316 2.88701 17.113C3.66842 17.8944 4.72822 18.3334 5.83329 18.3334H14.1666C15.2717 18.3334 16.3315 17.8944 17.1129 17.113C17.8943 16.3316 18.3333 15.2718 18.3333 14.1668V5.83342C18.3333 4.72835 17.8943 3.66854 17.1129 2.88714C16.3315 2.10574 15.2717 1.66675 14.1666 1.66675H5.83329ZM13.1083 8.90342C13.1831 8.82353 13.2415 8.72968 13.2801 8.62723C13.3187 8.52478 13.3367 8.41573 13.3332 8.30631C13.3296 8.19689 13.3045 8.08925 13.2594 7.98952C13.2142 7.88979 13.1498 7.79994 13.07 7.72508C12.9901 7.65023 12.8962 7.59184 12.7938 7.55326C12.6913 7.51468 12.5823 7.49665 12.4729 7.50021C12.3634 7.50377 12.2558 7.52885 12.1561 7.57401C12.0563 7.61917 11.9665 7.68353 11.8916 7.76342L9.32246 10.5051L8.05329 9.37758C7.88701 9.23935 7.6735 9.17116 7.45788 9.18743C7.24225 9.2037 7.04139 9.30315 6.89773 9.46477C6.75407 9.62639 6.67886 9.83752 6.68798 10.0536C6.6971 10.2696 6.78985 10.4737 6.94663 10.6226L8.82163 12.2893C8.98387 12.4334 9.19592 12.5085 9.4127 12.4987C9.62949 12.4889 9.83389 12.3949 9.98246 12.2368L13.1075 8.90342H13.1083Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                ) : (
                    <div className="state uncheck-state">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.1667 2.5H5.83333C3.99238 2.5 2.5 3.99238 2.5 5.83333V14.1667C2.5 16.0076 3.99238 17.5 5.83333 17.5H14.1667C16.0076 17.5 17.5 16.0076 17.5 14.1667V5.83333C17.5 3.99238 16.0076 2.5 14.1667 2.5Z"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                )}
                {label ? <div className="label">{label}</div> : <></>}
            </div>
        </div>
    );
};
Checkbox.propTypes = {
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    label: PropTypes.string,
};
Checkbox.defaultProps = {
    checked: false,
    onClick: () => {},
    label: undefined,
};
