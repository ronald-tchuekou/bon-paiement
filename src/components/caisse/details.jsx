import React from 'react';
import { Button } from '../../base/buttons';
import { FilesChooser } from '../../base/file_chooser';
import { TextInput } from '../../base/input_text';
import { RadioButton } from '../../base/radio_buttons';
import { SectionList, SectionListContent, SectionListHeader } from '../../base/section-list';
import { CurrentDetailMovementContext, LangContext } from '../../context';
import { Lang } from '../../lang';
import constants from '../../scripts/constants';

export const CaisseBeneficiersDetails = (props) => {
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);
    const { currentDetailMovement, setCurrentDetailMovement } = React.useContext(CurrentDetailMovementContext);

    const [name, setName] = React.useState({ value: '', error: false, helper: '' });
    const [first_name, setFirstName] = React.useState({ value: '', error: false, helper: '' });
    const [social_reason, setSocialReason] = React.useState({ value: '', error: false, helper: '' });
    const [civility, setCivility] = React.useState({ value: '', error: false, helper: '' });
    const [sex, setSex] = React.useState({ value: '', error: false, helper: '' });
    const [phone, setPhone] = React.useState({ value: '', error: false, helper: '' });
    const [fax, setFax] = React.useState({ value: '', error: false, helper: '' });
    const [email, setEmail] = React.useState({ value: '', error: false, helper: '' });
    const [location, setLocation] = React.useState({ value: '', error: false, helper: '' });
    const [pay_amount, setPayAmount] = React.useState({ value: '', error: false, helper: '' });
    const [pay_mode, setPayMode] = React.useState({ value: constants.PAY_MODE.banck, error: false, helper: '' });
    const [banck, setBanck] = React.useState({ value: '', error: false, helper: '' });
    const [banck_ref, setBanckRef] = React.useState({ value: '', error: false, helper: '' });
    const [ref1, setRef1] = React.useState({ value: '', error: false, helper: '' });
    const [ref2, setRef2] = React.useState({ value: '', error: false, helper: '' });
    const [ref3, setRef3] = React.useState({ value: '', error: false, helper: '' });
    const [ref4, setRef4] = React.useState({ value: '', error: false, helper: '' });

    function initAll() {
        const detail = currentDetailMovement;
        setName({ value: detail.beneficier.name || '', error: false, helper: '' });
        setFirstName({ value: detail.beneficier.first_name || '', error: false, helper: '' });
        setSocialReason({ value: detail.beneficier.civility || constants.PAY_MODE.banck, error: false, helper: '' });
        setSex({ value: detail.beneficier.civility || '', error: false, helper: '' });
        setPhone({ value: detail.beneficier.phone || '', error: false, helper: '' });
        setFax({ value: detail.beneficier.fax || '', error: false, helper: '' });
        setEmail({ value: detail.beneficier.email || '', error: false, helper: '' });
        setLocation({ value: detail.beneficier.location || '', error: false, helper: '' });
        setPayAmount({ value: detail.pay_amount || '', error: false, helper: '' });
        setPayMode({
            value: detail.banck.code ? constants.PAY_MODE.banck : constants.PAY_MODE.check,
            error: false,
            helper: '',
        });
        setBanck({ value: detail.banck.libelle || '', error: false, helper: '' });
        setBanckRef({ value: detail.check_ref || '', error: false, helper: '' });
        setRef1({ value: detail.ref1 || '', error: false, helper: '' });
        setRef2({ value: detail.ref2 || '', error: false, helper: '' });
        setRef3({ value: detail.ref3 || '', error: false, helper: '' });
        setRef4({ value: detail.ref4 || '', error: false, helper: '' });
    }

    function resetAll() {
        setName({ value: '', error: false, helper: '' });
        setFirstName({ value: '', error: false, helper: '' });
        setCivility({ value: '', error: false, helper: '' });
        setSocialReason({ value: constants.SOCIAL_REASON.particular, error: false, helper: '' });
        setSex({ value: '', error: false, helper: '' });
        setPhone({ value: '', error: false, helper: '' });
        setFax({ value: '', error: false, helper: '' });
        setEmail({ value: '', error: false, helper: '' });
        setLocation({ value: '', error: false, helper: '' });
        setPayAmount({ value: '', error: false, helper: '' });
        setPayMode({ value: constants.PAY_MODE.banck, error: false, helper: '' });
        setBanck({ value: '', error: false, helper: '' });
        setBanckRef({ value: '', error: false, helper: '' });
        setRef1({ value: '', error: false, helper: '' });
        setRef2({ value: '', error: false, helper: '' });
        setRef3({ value: '', error: false, helper: '' });
        setRef4({ value: '', error: false, helper: '' });
    }

    function handleSave() {
        showLoader();
        setTimeout(() => {
            hideLoader();
            setCurrentDetailMovement(new DetailMovement());
        }, 1000);
    }

    function handleCancel() {
        if (currentDetailMovement.code) {
            initAll();
        } else {
            resetAll();
        }
    }

    React.useMemo(() => {
        handleCancel();
    }, [currentDetailMovement]);

    return (
        <SectionList>
            <SectionListHeader title={Lang.beneficier_details[lang]} />
            <SectionListContent ref={content_ref}>
                <div className="row m-0">
                    {constants.arrays.social_reason.map((item) => (
                        <div className="col-6 text-default p-10" key={item.value}>
                            <RadioButton
                                label={item.label[lang]}
                                checked={social_reason.value === item.value}
                                onClick={() => setSocialReason({ value: item.value, error: false, helper: '' })}
                            />
                        </div>
                    ))}
                </div>

                <div className="row m-0">
                    <div className="col-12">
                        <TextInput
                            label={Lang.name[lang]}
                            placeholder={Lang.name[lang]}
                            value={name.value}
                            error={name.error}
                            helperText={name.helper}
                            onValueChange={(val) => setName({ value: val, error: false, helper: '' })}
                        />
                    </div>
                    <div className="col-12">
                        <TextInput
                            label={
                                social_reason.value === constants.SOCIAL_REASON.particular
                                    ? Lang.first_name[lang]
                                    : Lang.abreviation[lang]
                            }
                            placeholder={
                                social_reason.value === constants.SOCIAL_REASON.particular
                                    ? Lang.first_name[lang]
                                    : Lang.abreviation[lang]
                            }
                            value={first_name.value}
                            error={first_name.error}
                            helperText={first_name.helper}
                            onValueChange={(val) => setFirstName({ value: val, error: false, helper: '' })}
                        />
                    </div>
                </div>

                {social_reason.value === constants.SOCIAL_REASON.particular ? (
                    <div className="row m-0">
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
                ) : (
                    <></>
                )}

                <div className="row m-0">
                    <div className="col-6">
                        <TextInput
                            type="tel"
                            placeholder={Lang.phone[lang]}
                            label={Lang.phone[lang]}
                            value={phone.value}
                            error={phone.error}
                            helperText={phone.helper}
                            onValueChange={(val) => setPhone({ value: val, error: false, helper: '' })}
                        />
                    </div>
                    <div className="col-6">
                        <TextInput
                            type="tel"
                            placeholder={'Fax'}
                            label="Fax"
                            value={fax.value}
                            error={fax.error}
                            helperText={fax.helper}
                            onValueChange={(val) => setFax({ value: val, error: false, helper: '' })}
                        />
                    </div>
                </div>

                <div className="row m-0">
                    <div className="col-12">
                        <TextInput
                            type="email"
                            placeholder={Lang.mail_address[lang]}
                            label={Lang.mail_address[lang]}
                            value={email.value}
                            error={email.error}
                            helperText={email.helper}
                            onValueChange={(val) => setEmail({ value: val, error: false, helper: '' })}
                        />
                    </div>
                    <div className="col-12">
                        <TextInput
                            placeholder={Lang.location[lang]}
                            label={Lang.location[lang]}
                            value={location.value}
                            error={location.error}
                            helperText={location.helper}
                            onValueChange={(val) => setLocation({ value: val, error: false, helper: '' })}
                        />
                    </div>
                </div>

                <div className="row m-0">
                    <p className="text-title m-15">{Lang.dotation[lang]}</p>
                </div>

                <div className="row m-0">
                    <div className="col-12">
                        <TextInput
                            type="number"
                            placeholder={Lang.pay_amount[lang]}
                            label={Lang.pay_amount[lang]}
                            value={pay_amount.value + ''}
                            error={pay_amount.error}
                            helperText={pay_amount.helper}
                            onValueChange={(val) => setPayAmount({ value: val, error: false, helper: '' })}
                        />
                    </div>
                </div>

                <div className="row m-0">
                    <p className="text-title m-15">{Lang.pay_mode[lang]}</p>
                </div>

                <div className="row m-0">
                    {constants.arrays.pay_modes.map((item) => (
                        <div className="col-6 text-default p-10" key={item.value}>
                            <RadioButton
                                label={item.label[lang]}
                                checked={pay_mode.value === item.value}
                                onClick={() => setPayMode({ value: item.value, error: false, helper: '' })}
                            />
                        </div>
                    ))}
                </div>

                {pay_mode.value === constants.PAY_MODE.banck ? (
                    <div className="row m-0">
                        <div className="col-12">
                            <TextInput
                                placeholder={Lang.select_bank[lang]}
                                label={Lang.select_bank[lang]}
                                value={banck.value}
                                error={banck.error}
                                helperText={banck.helper}
                                onValueChange={(val) => setBanck({ value: val, error: false, helper: '' })}
                            />
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                {pay_mode.value === constants.PAY_MODE.check ? (
                    <>
                        <div className="row m-0">
                            <div className="col-12">
                                <TextInput
                                    placeholder={Lang.banck_ref[lang]}
                                    label={Lang.banck_ref[lang]}
                                    value={banck_ref.value}
                                    error={banck_ref.error}
                                    helperText={banck_ref.helper}
                                    onValueChange={(val) => setBanckRef({ value: val, error: false, helper: '' })}
                                />
                            </div>
                        </div>

                        <div className="row m-0">
                            <div className="col-6 col-xl-3">
                                <TextInput
                                    placeholder={'Ref 1'}
                                    label={'Ref 1'}
                                    value={ref1.value}
                                    error={ref1.error}
                                    helperText={ref1.helper}
                                    onValueChange={(val) => setRef1({ value: val, error: false, helper: '' })}
                                />
                            </div>

                            <div className="col-6 col-xl-3">
                                <TextInput
                                    placeholder={'Ref 2'}
                                    label={'Ref 2'}
                                    value={ref2.value}
                                    error={ref2.error}
                                    helperText={ref2.helper}
                                    onValueChange={(val) => setRef2({ value: val, error: false, helper: '' })}
                                />
                            </div>

                            <div className="col-6 col-xl-3">
                                <TextInput
                                    placeholder={'Ref 3'}
                                    label={'Ref 3'}
                                    value={ref3.value}
                                    error={ref3.error}
                                    helperText={ref3.helper}
                                    onValueChange={(val) => setRef3({ value: val, error: false, helper: '' })}
                                />
                            </div>

                            <div className="col-6 col-xl-3">
                                <TextInput
                                    placeholder={'Ref 4'}
                                    label={'Ref 4'}
                                    value={ref4.value}
                                    error={ref4.error}
                                    helperText={ref4.helper}
                                    onValueChange={(val) => setRef4({ value: val, error: false, helper: '' })}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}

                <div className="row p-10">
                    <FilesChooser />
                    {/* <div className="w-100 mt-10 wrong-image-picher" style={{ height: 70 }}>
                        <div className="text-primary">
                            <i className="fi fi-rr-plus"></i> &nbsp; Cliquer ici / Glisser votre fichier
                        </div>
                    </div> */}
                </div>

                <div className="m-0 ">
                    <div></div>
                    <div className="d-flex content-end items-center py-10">
                        <Button color="primary" onClick={handleSave}>
                            {Lang.save[lang]}
                        </Button>
                    </div>
                </div>
            </SectionListContent>
        </SectionList>
    );
};
