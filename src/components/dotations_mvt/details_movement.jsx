import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '../../base/buttons';
import { TextInput } from '../../base/input_text';
import DrawerContent from '../../scripts/drawerContent';
import {
    DetailMovemenstContext,
    CurrentDetailMovementContext,
    CurrentMovementContext,
    LangContext,
} from '../../context';
import { Lang } from '../../lang';
import { SectionList, SectionListContent, SectionListHeader } from '../../base/section-list';
import Beneficier from '../../models/Beneficier';
import DetailMovement from '../../models/DetailMovement';
import constants from '../../scripts/constants';

export const DetailsMovement = (props) => {
    const drawer_ref = React.useRef(null);
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);
    const { currentMovement } = React.useContext(CurrentMovementContext);
    const { setDetailMovements } = React.useContext(DetailMovemenstContext);
    const { setCurrentDetailMovement: setCurrentDetailMovement, currentDetailMovement: currentDetailMovement } =
        React.useContext(CurrentDetailMovementContext);

    const [drawer, setDrawer] = React.useState(undefined);

    React.useEffect(() => {
        if (drawer) drawer.gotToItem(0);
        else {
            setDrawer(new DrawerContent(drawer_ref.current));
        }
        () => {
            if (drawer) drawer.gotToItem(0);
            else {
                setDrawer(new DrawerContent(drawer_ref.current));
            }
        };
    }, []);

    React.useEffect(() => {
        setDetailMovements([]);
        setCurrentDetailMovement({});
        if (currentMovement.code)
            setTimeout(() => {
                getBeneficiers();
            }, 200);
    }, [currentMovement]);

    function getBeneficiers() {
        showLoader();
        setDetailMovements([]);
        new DetailMovement().getAll({
            success: (content) => setDetailMovements(content),
            error: (e) => console.error(e),
            final: () => hideLoader(),
        });
    }

    function showLoader() {
        if (content_ref.current) content_ref.current.showLoader();
    }

    function hideLoader() {
        if (content_ref.current) content_ref.current.dismissLoader();
    }

    React.useEffect(() => {
        if (drawer)
            if (currentDetailMovement.code) {
                drawer.next();
            } else {
                drawer.previous();
            }
    }, [currentDetailMovement]);

    return (
        <SectionList position="right" className="flex-2">
            <SectionListHeader
                search
                showBackPress={currentDetailMovement.code !== undefined && currentDetailMovement.code !== null}
                onBackPress={() => setCurrentDetailMovement({})}
                onChange={(value) => {}}
                onValidate={(value) => alert(value)}
                searchPlaceHolder={Lang.search_beneficiers[lang]}
                title={
                    currentDetailMovement.code
                        ? currentDetailMovement.code === 'none'
                            ? Lang.add_new_beneficier[lang]
                            : Lang.beneficier_details[lang]
                        : Lang.beneficiers_of_mvt[lang]
                }
            >
                <IconButton
                    disabled={currentMovement.code === undefined || currentMovement.code === null}
                    onClick={() => setCurrentDetailMovement(new DetailMovement('none'))}
                    color={'warning'}
                >
                    <i className="fi fi-rr-plus-small t-30"></i>
                </IconButton>
            </SectionListHeader>
            <SectionListContent ref={content_ref} className="scroll-h p-0">
                <div className="h-100 w-100" ref={drawer_ref}>
                    <BeneficiersTable />
                    <BeneficierDetails showLoader={showLoader} hideLoader={hideLoader} />
                </div>
            </SectionListContent>
        </SectionList>
    );
};

export const BeneficiersTable = (props) => {
    const { lang } = React.useContext(LangContext);
    const { detailMovements } = React.useContext(DetailMovemenstContext);
    const { currentDetailMovement, setCurrentDetailMovement } = React.useContext(CurrentDetailMovementContext);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr className="bordered-bottom">
                        <td>{Lang.complet_name[lang]}</td>
                        <td>{Lang.email[lang]}</td>
                        <td>{Lang.pay_amount[lang]}</td>
                        <td>{Lang.pay_mode[lang]}</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {detailMovements.map(
                        /**
                         * @param {DetailMovement} item
                         * @returns any
                         */
                        (item) => (
                            <tr
                                className={`${currentDetailMovement.code === item.code ? 'selected' : ''}`}
                                onClick={() => setCurrentDetailMovement(item)}
                                key={item.code}
                            >
                                <td>{item.beneficier.name + ' ' + item.beneficier.first_name}</td>
                                <td>{item.beneficier.email}</td>
                                <td>{item.pay_amount + ' XFA'}</td>
                                <td>{item.banck.code ? constants.PAY_MODE.banck : constants.PAY_MODE.check}</td>
                                <td>
                                    <IconButton color="white" className="m-0">
                                        <i className="fi fi-rr-menu-dots"></i>
                                    </IconButton>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export const BeneficierDetails = (props) => {
    const { showLoader, hideLoader } = props;

    const { lang } = React.useContext(LangContext);
    const { currentDetailMovement, setCurrentDetailMovement } = React.useContext(CurrentDetailMovementContext);

    const [name, setName] = React.useState({ value: '', error: false, helper: '' });
    const [first_name, setFirstName] = React.useState({ value: '', error: false, helper: '' });
    const [civility, setCivility] = React.useState({ value: '', error: false, helper: '' });
    const [sex, setSex] = React.useState({ value: '', error: false, helper: '' });
    const [phone, setPhone] = React.useState({ value: '', error: false, helper: '' });
    const [fax, setFax] = React.useState({ value: '', error: false, helper: '' });
    const [email, setEmail] = React.useState({ value: '', error: false, helper: '' });
    const [location, setLocation] = React.useState({ value: '', error: false, helper: '' });
    const [pay_amount, setPayAmount] = React.useState({ value: '', error: false, helper: '' });
    const [pay_mode, setPayMode] = React.useState({ value: '', error: false, helper: '' });
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
        setCivility({ value: detail.beneficier.civility || '', error: false, helper: '' });
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
        setSex({ value: '', error: false, helper: '' });
        setPhone({ value: '', error: false, helper: '' });
        setFax({ value: '', error: false, helper: '' });
        setEmail({ value: '', error: false, helper: '' });
        setLocation({ value: '', error: false, helper: '' });
        setPayAmount({ value: '', error: false, helper: '' });
        setPayMode({ value: '', error: false, helper: '' });
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
            setCurrentDetailMovement({});
        }, 1000);
    }

    function handleCancel() {
        resetAll();
    }

    React.useMemo(() => {
        if (currentDetailMovement.code) {
            initAll();
        } else {
            resetAll();
        }
    }, [currentDetailMovement]);

    return (
        <div className="p-10 scroll-y h-100">
            <div className="row m-0">
                <div className="col-6 text-default p-10">Entreprise</div>
                <div className="col-6 text-default p-10">Particuler</div>
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
                        label={Lang.first_name[lang]}
                        placeholder={Lang.first_name[lang]}
                        value={first_name.value}
                        error={first_name.error}
                        helperText={first_name.helper}
                        onValueChange={(val) => setFirstName({ value: val, error: false, helper: '' })}
                    />
                </div>
            </div>

            <div className="row m-0">
                <div className="col-6 text-default p-10">Masculin</div>
                <div className="col-6 text-default p-10">Feminin</div>
            </div>

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
                <div className="col-6 text-default p-10">{Lang.bank[lang]}</div>
                <div className="col-6 text-default p-10">Cheque</div>
            </div>

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

            <div className="row m-0 ">
                <div className="d-flex content-between items-center py-10">
                    <Button color="danger" onClick={handleCancel}>
                        {Lang.cancel[lang]}
                    </Button>
                    <Button color="primary" onClick={handleSave}>
                        {Lang.save[lang]}
                    </Button>
                </div>
            </div>
        </div>
    );
};

BeneficierDetails.propTypes = {
    showLoader: PropTypes.func,
    hideLoader: PropTypes.func,
};

BeneficierDetails.defaultProps = {
    showLoader: () => {},
    hideLoader: () => {},
};
