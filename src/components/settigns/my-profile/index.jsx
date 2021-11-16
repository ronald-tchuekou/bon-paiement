import React from 'react';
import { Button } from '../../../base/buttons';
import { Checkbox } from '../../../base/checkbox';
import { TextInput } from '../../../base/input_text';
import { RadioButton } from '../../../base/radio_buttons';
import { SectionList, SectionListContent } from '../../../base/section-list';
import { LangContext } from '../../../context';
import { Lang } from '../../../lang';
import Rule from '../../../models/Rule';
import User from '../../../models/User';
import constants from '../../../scripts/constants';

export const MyProfile = React.forwardRef(
    (props, ref) => {
        const input_file_ref = React.useRef(null);
        const profile_ref = React.useRef(null);

        const { lang } = React.useContext(LangContext);

        const currentUser = new User(
            'Code',
            'Tchuekou',
            'Ronald',
            constants.CIVILITY.male,
            '5087043983',
            '094850874',
            'ronald@ronald.com',
            []
        );

        const [new_password, setNewPassword] = React.useState({ value: '', error: false, helper: '' });
        const [confirm_pass, setConfirmPass] = React.useState({ value: '', error: false, helper: '' });

        const [rules, setRules] = React.useState([]);

        const initValues = React.useCallback(() => {
            new Rule().getAll({
                success: (content) => setRules(content),
                error: (e) => console.error(e),
                final: () => {},
            });
        }, []);

        React.useEffect(() => {
            initValues();
        }, [initValues]);

        React.useImperativeHandle(ref, () => ({
            refreshContent: () => {},
        }));

        /**
         * Fonction qui permet d'uploader le profile de l'utilisateur.
         */
        function uploadImage(e) {
            let file = e.target.files[0];
            profile_ref.current.src = URL.createObjectURL(file);
            console.log(file);
            // TODO
        }

        return (
            <div className="p-15 h-100" style={{ overflowY: 'auto' }}>
                <div className="row m-0 p-0">
                    <div className="col-12 col-m-2 d-flex content-center items-center d-flex-c">
                        <div onClick={() => input_file_ref.current.click()} className="profile">
                            <input accept="image/*" onChange={uploadImage} ref={input_file_ref} type="file" />
                            <img ref={profile_ref} src="/img/undraw_profile_pic_ic-5-t.svg" alt="Profile" />
                            <div className="edit">
                                <i className="fi fi-rr-pencil"></i>
                            </div>
                        </div>
                        <div className="text-default t-20">{'username'}</div>
                    </div>
                    <div className="col-12 col-m-10">
                        <h3>{Lang.change_password[lang]}</h3>
                        <div className="row m-0 p-0">
                            <div className="col-12 col-m-6 m-0 p-0 pl-0 m-pl-10">
                                <TextInput
                                    type={'password'}
                                    placeholder={Lang.new_pass[lang]}
                                    value={new_password.value}
                                    error={new_password.error}
                                    helperText={new_password.helper}
                                    onValueChange={(val) => setNewPassword({ value: val, error: false, helper: '' })}
                                >
                                    <i className="fi fi-rr-lock"></i>
                                </TextInput>
                            </div>
                            <div className="col-12 col-m-6 m-0 p-0 pl-0 m-pl-10">
                                <TextInput
                                    type={'password'}
                                    placeholder={Lang.confirm_password[lang]}
                                    value={confirm_pass.value}
                                    error={confirm_pass.error}
                                    helperText={confirm_pass.helper}
                                    onValueChange={(val) => setConfirmPass({ value: val, error: false, helper: '' })}
                                >
                                    <i className="fi fi-rr-lock"></i>
                                </TextInput>
                            </div>
                        </div>
                        <div className="m-0 ">
                            <div></div>
                            <div className="d-flex content-between items-center py-10">
                                <Button color="danger" onClick={() => {}}>
                                    {Lang.cancel[lang]}
                                </Button>
                                <Button color="primary" onClick={() => {}}>
                                    {Lang.save[lang]}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h3>{Lang.change_password[lang]}</h3>
                </div>

                <div className="row mt-10 px-10">
                    <div className="col-12 col-m-6 m-0 p-0 pr-0 m-pr-5">
                        <div className="text-default">{Lang.name[lang]}</div>
                        <TextInput disabled value={currentUser.name} />
                    </div>

                    <div className="col-12 col-m-6 m-0 p-0 pl-0 m-pl-5">
                        <div className="text-default">{Lang.first_name[lang]}</div>
                        <TextInput disabled value={currentUser.first_name} />
                    </div>
                </div>

                <div className="row mt-10 px-10">
                    <div className="col-12 col-m-6 m-0 p-0 pr-0 m-pr-5">
                        <div className="text-default">{Lang.sex[lang]}</div>
                        {constants.arrays.civilities.map((item) => (
                            <div className="col-6 text-default p-10" key={item.value}>
                                <RadioButton
                                    label={item.label[lang]}
                                    checked={currentUser.sex === item.value}
                                    onClick={() => {}}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="col-12 col-m-6 m-0 p-0 pl-0 m-pl-5">
                        <div className="text-default">{Lang.phone[lang]}</div>
                        <TextInput disabled value={currentUser.phone} />
                    </div>
                </div>

                <div className="row mt-10 px-10">
                    <div className="col-12 col-m-6 m-0 p-0 pr-0 m-pr-5">
                        <div className="text-default">{'Fax'}</div>
                        <TextInput disabled value={currentUser.fax} />
                    </div>

                    <div className="col-12 col-m-6 m-0 p-0 pl-0 m-pl-5">
                        <div className="text-default">{Lang.mail_address[lang]}</div>
                        <TextInput disabled value={currentUser.email} />
                    </div>
                </div>

                <div className="mt-20 mb-10">
                    <h3>{Lang.our_rules_about_app_components[lang]}</h3>
                </div>

                {/* Les roles. */}
                <div className="row m-0">
                    <div className="col-12 m-0">
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr className="bordered-bottom">
                                        <td className="text-center">Lecture</td>
                                        <td className="text-center">Ecriture</td>
                                        <td className="text-center">Suppression</td>
                                        <td className="text-center">Tous</td>
                                        <td>Composants</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rules.map(
                                        /**
                                         * @param {Rule} item
                                         * @returns
                                         */
                                        (item) => (
                                            <tr key={item.composant.code}>
                                                <td className="text-center">
                                                    <Checkbox checked={item.read} onClick={() => onReadChange(item)} />
                                                </td>
                                                <td className="text-center">
                                                    <Checkbox
                                                        checked={item.write}
                                                        onClick={() => onWriteChange(item)}
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <Checkbox
                                                        checked={item.delete}
                                                        onClick={() => onDeleteChange(item)}
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <Checkbox
                                                        checked={item.read && item.write && item.delete}
                                                        onClick={() => onAllChange(item)}
                                                    />
                                                </td>
                                                <td>{item.composant.libelle}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    { displayName: 'Profiles' }
);
