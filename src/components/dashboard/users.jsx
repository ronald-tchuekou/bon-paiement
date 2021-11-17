import React from 'react';
import { Button, IconButton } from '../../base/buttons';
import { LangContext } from '../../context';
import { Lang } from '../../lang';
import User from '../../models/User';
import { AddLoader } from '../../scripts/app';

export const DashboardUsers = (props) => {
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);

    const [users, setUsers] = React.useState([]);
    const [loader, setLoader] = React.useState(undefined);

    React.useEffect(() => {
        setTimeout(() => {
            getUsers();
        }, 300);
        return () => {
            if (loader) loader.dismiss();
        };
    }, []);

    function getUsers() {
        let load = AddLoader(content_ref.current);
        load.show();
        setLoader(load);
        new User().getAll({
            success: (content) => setUsers(content),
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
                <div className="table-container">
                    <table>
                        <thead>
                            <tr className="bordered-bottom">
                                <td>{Lang.complet_name[lang]}</td>
                                <td>{Lang.phone[lang]}</td>
                                <td>{Lang.status[lang]}</td>
                                <td>{Lang.on_line[lang]}</td>
                                <td>{Lang.last_connection[lang]}</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(
                                /**
                                 * @param {User} item
                                 * @returns any
                                 */
                                (item, i) => (
                                    <tr key={item.code}>
                                        <td>
                                            <div className="row">
                                                <div className="col-3">
                                                    <div className="profile-s" style={{ width: 40, height: 40 }}>
                                                        <img src="/img/undraw_profile_pic_ic-5-t.svg" alt="Profile" />
                                                    </div>
                                                </div>
                                                <div className="col-9">
                                                    <div className="text-default">
                                                        {item.name + ' ' + item.first_name}
                                                    </div>
                                                    <div className="text-primary">{item.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">{item.phone}</td>
                                        <td>
                                            <div className="d-flex content-center items-center">
                                                <div
                                                    className={`badge ${
                                                        item.status === 'En ligne'
                                                            ? 'badge-success'
                                                            : item.status === 'Hors ligne'
                                                            ? 'badge-warning'
                                                            : 'badge-danger'
                                                    }`}
                                                >
                                                    {item.status}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex content-center items-center">
                                                <div className={`bool ${i % 2 === 0 ? '' : 'bool-danger'}`}></div>
                                            </div>
                                        </td>
                                        <td>{item.date.toLocaleString()}</td>
                                        <td>
                                            <div className="d-flex content-end items-center w-100">
                                                <IconButton color="white" className="m-0">
                                                    <i className="fi fi-rr-menu-dots"></i>
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="conten invisible-scroll">
                    {users.map(
                        /**
                         * @param {User} item
                         * @returns
                         */
                        (item) => {
                            return <div className="bon-type-item" key={item.code}></div>;
                        }
                    )}
                </div>
            </div>
        </>
    );
};
