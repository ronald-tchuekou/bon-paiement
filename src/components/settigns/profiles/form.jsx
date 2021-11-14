import React from 'react';
import { Button } from '../../../base/buttons';
import { Checkbox } from '../../../base/checkbox';
import { TextInput } from '../../../base/input_text';
import { SectionList, SectionListContent, SectionListHeader } from '../../../base/section-list';
import { CurrentProfileContext, LangContext } from '../../../context';
import { Lang } from '../../../lang';
import Profile from '../../../models/Profile';
import Rule from '../../../models/Rule';

export const ProfileForm = (props) => {
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);
    const { currentProfile, setCurrentProfile } = React.useContext(CurrentProfileContext);

    const [libelle, setLibelle] = React.useState({ value: '', error: false, helper: '' });
    const [rules, setRules] = React.useState([]);

    const initValues = React.useCallback(() => {
        setLibelle({ value: currentProfile.libelle || '', error: false, helper: '' });
        content_ref.current.showLoader();
        new Rule().getAll({
            success: (content) => setRules(content),
            error: (e) => console.error(e),
            final: () => content_ref.current.dismissLoader(),
        });
    }, [currentProfile]);

    React.useEffect(() => {
        initValues();
    }, [initValues]);

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
            setCurrentProfile(new Profile());
        }, 1000);
    }

    /**
     * @param {Rule} item_
     */
    function onReadChange(item_) {
        setRules((rules) => {
            return rules.map(
                /**
                 * @param {Rule} item
                 * @returns
                 */
                (item) => {
                    if (item.composant.code === item_.composant.code) {
                        return {
                            ...item_,
                            read: !item_.read,
                        };
                    }
                    return item;
                }
            );
        });
    }

    /**
     * @param {Rule} item_
     */
    function onWriteChange(item_) {
        setRules((rules) => {
            return rules.map(
                /**
                 * @param {Rule} item
                 * @returns
                 */
                (item) => {
                    if (item.composant.code === item_.composant.code) {
                        return {
                            ...item_,
                            write: !item_.write,
                        };
                    }
                    return item;
                }
            );
        });
    }

    /**
     * @param {Rule} item_
     */
    function onDeleteChange(item_) {
        setRules((rules) => {
            return rules.map(
                /**
                 * @param {Rule} item
                 * @returns
                 */
                (item) => {
                    if (item.composant.code === item_.composant.code) {
                        return {
                            ...item_,
                            delete: !item_.delete,
                        };
                    }
                    return item;
                }
            );
        });
    }

    /**
     * @param {Rule} item_
     */
    function onAllChange(item_) {
        let state = item_.write && item_.read && item_.delete;
        setRules((rules) => {
            return rules.map(
                /**
                 * @param {Rule} item
                 * @returns
                 */
                (item) => {
                    if (item.composant.code === item_.composant.code) {
                        return {
                            ...item_,
                            read: !state,
                            write: !state,
                            delete: !state,
                        };
                    }
                    return item;
                }
            );
        });
    }

    return (
        <SectionList position="right" className="flex-1">
            <SectionListHeader title={Lang.profile_form[lang]} />
            <SectionListContent ref={content_ref}>
                <div>
                    <div className="row mt-10 px-10">
                        <div className="col-12 m-0 p-0">
                            <TextInput
                                disabled
                                placeholder={'Code'}
                                value={currentProfile.code || ''}
                                onValueChange={() => {}}
                            />
                        </div>

                        <div className="col-12 m-0 p-0">
                            <TextInput
                                placeholder={Lang.libelle[lang]}
                                value={libelle.value}
                                error={libelle.error}
                                helperText={libelle.helper}
                                onValueChange={(val) => setLibelle({ value: val, error: false, helper: '' })}
                            />
                        </div>
                    </div>

                    <div className="row m-0">
                        <p className="text-primary m-15">{Lang.manage_rules_of_profile[lang]}</p>
                    </div>

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
                                                        <Checkbox
                                                            checked={item.read}
                                                            onClick={() => onReadChange(item)}
                                                        />
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
};
