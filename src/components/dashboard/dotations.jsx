import React from 'react';
import { LangContext } from '../../context';
import { Lang } from '../../lang';
import Dotation from '../../models/Dotation';
import { AddLoader } from '../../scripts/app';

export const DashboardDotations = (props) => {
    const bon_type_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);

    const [dotations, setDotations] = React.useState([]);
    const [loader, setLoader] = React.useState(undefined);

    React.useEffect(() => {
        setTimeout(() => {
            getDotations();
        }, 300);
        return () => {
            if (loader) loader.dismiss();
        };
    }, []);

    function getDotations() {
        let load = AddLoader(bon_type_ref.current);
        load.show();
        setLoader(load);
        new Dotation().getAll({
            success: (content) => setDotations(content),
            error: (e) => console.error(e),
            final: () => {
                if (load) load.dismiss();
            },
        });
    }

    return (
        <>
            <div className="d-flex content-between items-center p-10">
                <div className="text-default-dark t-20">{Lang.bon_type[lang]}</div>
                <button className="btn icon-btn contained-white m-0">
                    <i className="fi fi-rr-menu-dots"></i>
                </button>
            </div>
            <div ref={bon_type_ref} className="bon-type_container">
                <div className="conten invisible-scroll">
                    {dotations.map(
                        /**
                         * @param {Dotation} item
                         * @returns
                         */
                        (item) => {
                            return (
                                <div className="bon-type-item" key={item.code}>
                                    <div className="text-default-dark">{(item.slipType || {}).libelle}</div>
                                    <div className="text-danger d-flex items-center">
                                        <i className="fi fi-rr-cube t-20"></i> &nbsp;
                                        <span>{item.amount}</span> XFA
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </>
    );
};
