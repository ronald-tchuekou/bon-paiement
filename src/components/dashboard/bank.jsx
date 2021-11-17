import React from 'react';
import { Button } from '../../base/buttons';
import { LangContext } from '../../context';
import { Lang } from '../../lang';
import Banck from '../../models/Banck';
import User from '../../models/User';
import { AddLoader } from '../../scripts/app';

export const DashboardBanks = (props) => {
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);

    const [banks, setBanks] = React.useState([]);
    const [loader, setLoader] = React.useState(undefined);

    React.useEffect(() => {
        setTimeout(() => {
            getBanks();
        }, 300);
        return () => {
            if (loader) loader.dismiss();
        };
    }, []);

    function getBanks() {
        let load = AddLoader(content_ref.current);
        load.show();
        setLoader(load);
        new Banck().getAll({
            success: (content) => setBanks(content),
            error: (e) => console.error(e),
            final: () => {
                if (load) load.dismiss();
            },
        });
    }

    return (
        <>
            <div className="d-flex content-between items-center p-10">
                <div className="text-default-dark t-20">{Lang.users_list[lang]}</div>
                <Button className="btn icon-btn contained-white m-0">
                    <i className="fi fi-rr-menu-dots"></i>
                </Button>
            </div>
            <div ref={content_ref} className="users_container">
                <div className="content">
                    {banks.map(
                        /**
                         * @param {Banck} item
                         * @returns
                         */
                        (item) => {
                            return (
                                <div className="bank-item" key={item.code}>
                                    <div className="text-default_gray">
                                        {item.libelle} <i className="fi fi-rr-minus-small"></i>
                                        {item.abreviation}
                                    </div>
                                    <div className="text-default t-14">{item.email}</div>
                                    <small className="text-warning">
                                        {Lang.add_on[lang]}&nbsp;{item.date.toLocaleDateString()}
                                    </small>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </>
    );
};
