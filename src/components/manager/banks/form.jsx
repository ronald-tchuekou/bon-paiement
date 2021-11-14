import React from 'react';
import { Button } from '../../../base/buttons';
import { TextInput } from '../../../base/input_text';
import { SectionList, SectionListContent, SectionListHeader } from '../../../base/section-list';
import { CurrentBanckContext, LangContext } from '../../../context';
import { Lang } from '../../../lang';
import Banck from '../../../models/Banck';

export const BanckForm = (props) => {
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);
    const { currentBanck, setCurrentBanck } = React.useContext(CurrentBanckContext);

    const [libelle, setLibelle] = React.useState({ value: '', error: false, helper: '' });
    const [abreviation, setAbreviation] = React.useState({ value: '', error: false, helper: '' });
    const [mail, setMail] = React.useState({ value: '', error: false, helper: '' });
    const [phone, setPhone] = React.useState({ value: '', error: false, helper: '' });
    const [fax, setFax] = React.useState({ value: '', error: false, helper: '' });

    const initValues = React.useCallback(() => {
        setLibelle({ value: currentBanck.libelle || '', error: false, helper: '' });
        setAbreviation({ value: currentBanck.abreviation || '', error: false, helper: '' });
        setMail({ value: currentBanck.email || '', error: false, helper: '' });
        setPhone({ value: currentBanck.phone || '', error: false, helper: '' });
        setFax({ value: currentBanck.fax || '', error: false, helper: '' });
    }, [currentBanck]);

    React.useEffect(() => {
        initValues();
    }, [initValues]);

    function validate() {
        let validate = true;
        if (libelle.value.trim() === '') {
            validate = false;
            setLibelle((s) => ({ ...s, error: true, helper: Lang.set_libelle[lang] }));
        }
        if (abreviation.value.trim() === '') {
            validate = false;
            setAbreviation((s) => ({ ...s, error: true, helper: Lang.set_abreviation[lang] }));
        }
        if (mail.value.trim() === '') {
            validate = false;
            setMail((s) => ({ ...s, error: true, helper: Lang.set_email[lang] }));
        }
        if (phone.value.trim() === '') {
            validate = false;
            setPhone((s) => ({ ...s, error: true, helper: Lang.set_phone[lang] }));
        }
        if (fax.value.trim() === '') {
            validate = false;
            setFax((s) => ({ ...s, error: true, helper: Lang.set_fax[lang] }));
        }
        return validate;
    }

    function handleSave() {
        if (!validate()) return;
        content_ref.current.showLoader();
        setTimeout(() => {
            content_ref.current.dismissLoader();
            setCurrentBanck(new Banck());
        }, 1000);
    }

    return (
        <SectionList position="right" className="flex-1">
            <SectionListHeader title={Lang.bank_form[lang]} />
            <SectionListContent ref={content_ref}>
                <div className="row mt-10 px-10">
                    <div className="col-12 m-0 p-0">
                        <TextInput
                            placeholder={Lang.name[lang]}
                            value={libelle.value}
                            error={libelle.error}
                            helperText={libelle.helper}
                            onValueChange={(val) => setLibelle({ value: val, error: false, helper: '' })}
                        />
                    </div>
                    <div className="col-12 m-0 p-0">
                        <TextInput
                            placeholder={Lang.abreviation[lang]}
                            value={abreviation.value}
                            error={abreviation.error}
                            helperText={abreviation.helper}
                            onValueChange={(val) => setAbreviation({ value: val, error: false, helper: '' })}
                        />
                    </div>
                    <div className="col-12 m-0 p-0">
                        <TextInput
                            placeholder={Lang.email[lang]}
                            value={mail.value}
                            error={mail.error}
                            helperText={mail.helper}
                            onValueChange={(val) => setMail({ value: val, error: false, helper: '' })}
                        />
                    </div>
                </div>

                <div className="row m-0 p-0">
                    <div className="col-12 col-m-6 m-0 px-5">
                        <TextInput
                            placeholder={Lang.phone[lang]}
                            value={phone.value}
                            error={phone.error}
                            helperText={phone.helper}
                            onValueChange={(val) => setPhone({ value: val, error: false, helper: '' })}
                        />
                    </div>
                    <div className="col-12 col-m-6 m-0 px-5">
                        <TextInput
                            placeholder={'Fax'}
                            value={fax.value}
                            error={fax.error}
                            helperText={fax.helper}
                            onValueChange={(val) => setFax({ value: val, error: false, helper: '' })}
                        />
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
            </SectionListContent>
        </SectionList>
    );
};
