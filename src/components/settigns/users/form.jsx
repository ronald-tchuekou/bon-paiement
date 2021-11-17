import React from 'react';
import { Button } from '../../../base/buttons';
import { Checkbox } from '../../../base/checkbox';
import { TextInput } from '../../../base/input_text';
import { SectionList, SectionListContent, SectionListHeader } from '../../../base/section-list';
import { CurrentUserContext, LangContext } from '../../../context';
import { Lang } from '../../../lang';
import User from '../../../models/User';
import Rule from '../../../models/Rule';
import { RadioButton } from '../../../base/radio_buttons';
import constants from '../../../scripts/constants';
import Profile from '../../../models/Profile';

export const UserForm = React.forwardRef((props, ref) => {
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);
    const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState({ value: '', error: false, helper: '' });
    const [first_name, setFirstName] = React.useState({ value: '', error: false, helper: '' });
    const [sex, setSex] = React.useState({ value: '', error: false, helper: '' });
    const [phone, setPhone] = React.useState({ value: '', error: false, helper: '' });
    const [fax, setFax] = React.useState({ value: '', error: false, helper: '' });
    const [mail, setMail] = React.useState({ value: '', error: false, helper: '' });
    const [profiles, setProfiles] = React.useState({ value: [], error: false, helper: '' });

    const [all_profiles, setAllProfiles] = React.useState([]);

    const initValues = React.useCallback(() => {
        setName({ value: currentUser.name || '', error: false, helper: '' });
        setFirstName({ value: currentUser.first_name || '', error: false, helper: '' });
        setSex({ value: currentUser.sex || '', error: false, helper: '' });
        setPhone({ value: currentUser.phone || '', error: false, helper: '' });
        setFax({ value: currentUser.fax || '', error: false, helper: '' });
        setMail({ value: currentUser.email || '', error: false, helper: '' });
        setProfiles({ value: currentUser.profiles || [], error: false, helper: '' });
    }, [currentUser]);

    React.useEffect(() => {
        initValues();
    }, [initValues]);

    React.useImperativeHandle(ref, () => ({
        initContent: () => {
            content_ref.current.showLoader();
            new Profile().getAll({
                success: (content) => setAllProfiles(content),
                error: (e) => console.error(e),
                final: () => content_ref.current.dismissLoader(),
            });
        },
    }));

    function validate() {
        let validate = true;
        if (libelle.value.trim() === '') {
            validate = false;
            setLibelle((s) => ({ ...s, error: true, helper: Lang.set_libelle[lang] }));
        }
        return validate;
    }

    function handleSave() {
        if (!validate()) return;
        content_ref.current.showLoader();
        setTimeout(() => {
            content_ref.current.dismissLoader();
            setCurrentUser(new User());
        }, 1000);
    }

    /**
     * @param {Profile} item
     * @returns
     */
    function isChoosed(item) {
        return profiles.value.find((_item) => _item.code === item.code) !== undefined;
    }

    function selectThis(_item) {
        if (isChoosed(_item)) {
            setProfiles((state) => ({ ...state, value: state.value.filter((item) => item.code !== _item.code) }));
        } else {
            setProfiles((state) => ({ ...state, value: [...state.value, _item] }));
        }
    }

    return (
        <SectionList position="right" className="flex-1">
            <SectionListHeader title={Lang.users_form[lang]} />
            <SectionListContent ref={content_ref}>
                <div>
                    <div className="row mt-10 px-10">
                        <div className="col-12 col-m-6 m-0 p-0 pr-0 m-pr-5">
                            <div className="text-default">{Lang.name[lang]}</div>
                            <TextInput
                                placeholder={Lang.name[lang]}
                                value={name.value}
                                error={name.error}
                                helperText={name.helper}
                                onValueChange={(val) => setName({ value: val, error: false, helper: '' })}
                            />
                        </div>

                        <div className="col-12 col-m-6 m-0 p-0 pl-0 m-pl-5">
                            <div className="text-default">{Lang.first_name[lang]}</div>
                            <TextInput
                                placeholder={Lang.first_name[lang]}
                                value={first_name.value}
                                error={first_name.error}
                                helperText={first_name.helper}
                                onValueChange={(val) => setFirstName({ value: val, error: false, helper: '' })}
                            />
                        </div>
                    </div>

                    <div className="row mt-10 px-10">
                        <div className="col-12 col-m-6 m-0 p-0 pr-0 m-pr-5">
                            <div className="text-default">{Lang.sex[lang]}</div>
                            {constants.arrays.civilities.map((item) => (
                                <div className="col-6 text-default p-10" key={item.value}>
                                    <RadioButton
                                        label={item.label[lang]}
                                        checked={sex.value === item.value}
                                        onClick={() => setSex({ value: item.value, error: false, helper: '' })}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="col-12 col-m-6 m-0 p-0 pl-0 m-pl-5">
                            <div className="text-default">{Lang.phone[lang]}</div>
                            <TextInput
                                placeholder={Lang.phone[lang]}
                                value={phone.value}
                                error={phone.error}
                                helperText={phone.helper}
                                onValueChange={(val) => setPhone({ value: val, error: false, helper: '' })}
                            />
                        </div>
                    </div>

                    <div className="row mt-10 px-10">
                        <div className="col-12 col-m-6 m-0 p-0 pr-0 m-pr-5">
                            <div className="text-default">{'Fax'}</div>
                            <TextInput
                                placeholder={'Fax'}
                                value={fax.value}
                                error={fax.error}
                                helperText={fax.helper}
                                onValueChange={(val) => setFax({ value: val, error: false, helper: '' })}
                            />
                        </div>

                        <div className="col-12 col-m-6 m-0 p-0 pl-0 m-pl-5">
                            <div className="text-default">{Lang.mail_address[lang]}</div>
                            <TextInput
                                placeholder={Lang.mail_address[lang]}
                                value={mail.value}
                                error={mail.error}
                                helperText={mail.helper}
                                onValueChange={(val) => setMail({ value: val, error: false, helper: '' })}
                            />
                        </div>
                    </div>

                    <div className="row m-0">
                        <p className="text-primary m-15">{Lang.profiles_config[lang]}</p>
                    </div>

                    <div className="row m-0 p-0">
                        <div className="col-12 p-10 d-flex flex-flow-wrap">
                            {all_profiles.map(
                                /**
                                 * @param {Profile} item
                                 * @returns
                                 */
                                (item) => (
                                    <div
                                        tabIndex="0"
                                        onClick={() => selectThis(item)}
                                        onKeyPress={(e) => {
                                            if (e.code === 'Space' || e.key === 'Enter') {
                                                selectThis(item);
                                            }
                                        }}
                                        className={`switch-default ${isChoosed(item) ? 'select' : ''}`}
                                        key={item.code}
                                    >
                                        {item.libelle}
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div className="m-0 ">
                        <div></div>
                        <div className="d-flex content-between items-center py-10">
                            <Button color="danger" onClick={initValues}>
                                {Lang.cancel[lang]}
                            </Button>
                            <Button color="primary" onClick={handleSave}>
                                {Lang.save[lang]}
                            </Button>
                        </div>
                    </div>
                </div>
            </SectionListContent>
        </SectionList>
    );
});
