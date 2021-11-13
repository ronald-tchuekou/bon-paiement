import React from 'react';
import { Button } from '../../../base/buttons';
import { TextInput } from '../../../base/input_text';
import { SectionList, SectionListContent, SectionListHeader } from '../../../base/section-list';
import { CurrentDotationContext, LangContext } from '../../../context';
import { Lang } from '../../../lang';
import Dotation from '../../../models/Dotation';

export const DotationForm = (props) => {
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);
    const { currentDotation, setCurrentDotation } = React.useContext(CurrentDotationContext);

    const [libelle, setLibelle] = React.useState({ value: '', error: false, helper: '' });
    const [abreviation, setAbreviation] = React.useState({ value: '', error: false, helper: '' });

    const initValues = React.useCallback(() => {
        setLibelle({ value: currentDotation.libelle || '', error: false, helper: '' });
        setAbreviation({ value: currentDotation.abreviation || '', error: false, helper: '' });
    }, [currentDotation]);

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
        return validate;
    }

    function handleSave() {
        if (!validate()) return;
        content_ref.current.showLoader();
        setTimeout(() => {
            content_ref.current.dismissLoader();
            setCurrentDotation(new Dotation());
        }, 1000);
    }

    return (
        <SectionList position="right" className="flex-1">
            <SectionListHeader title={Lang.bon_type_form[lang]} />
            <SectionListContent ref={content_ref}>
                <div className="row mt-10 px-10">
                    <div className="col-12 m-0 p-0">
                        <TextInput
                            placeholder={Lang.bon_type[lang]}
                            value={libelle.value}
                            error={libelle.error}
                            helperText={libelle.helper}
                            onValueChange={(val) => setLibelle({ value: val, error: false, helper: '' })}
                        />
                    </div>
                    <div className="col-12 m-0 p-0">
                        <TextInput
                            placeholder={Lang.amount_of_the_dotation[lang]}
                            value={abreviation.value}
                            error={abreviation.error}
                            helperText={abreviation.helper}
                            onValueChange={(val) => setAbreviation({ value: val, error: false, helper: '' })}
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
