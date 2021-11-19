import React from 'react';
import { Modal, ModalContent, ModalHeader } from '../../base/modal';
import { Button } from '../../base/buttons';
import { Lang } from '../../lang';
import { LangContext } from '../../context';
import { TextInput } from '../../base/input_text';
import { FilesChooser } from '../../base/file_chooser';

export const AddMVTPopup = React.forwardRef(
    (props, ref) => {
        const modal_ref = React.useRef(null);

        const { lang } = React.useContext(LangContext);

        const [charge_amount, setChargeAmount] = React.useState({
            value: '',
            error: false,
            helper: '',
        });
        const [advanced_amount, setAdvanced] = React.useState('0');

        React.useImperativeHandle(ref, () => ({
            show: show,
            dismiss: dismiss,
            showLoader: showLoader,
            dismissLoader: dismissLoader,
        }));

        function show() {
            modal_ref.current.show();
        }

        function dismiss() {
            modal_ref.current.dismiss();
        }

        function showLoader() {
            modal_ref.current.showLoader();
        }

        function dismissLoader() {
            modal_ref.current.dismissLoader();
        }

        function save() {
            showLoader();
            setTimeout(() => {
                dismissLoader();
                dismiss();
            }, 1000);
        }

        function cancel() {
            // TODO
            setChargeAmount({ value: '', error: false, helper: '' });
            setAdvanced('0');
        }

        return (
            <Modal cancelable={false} ref={modal_ref}>
                <ModalHeader title={Lang.add_dotation_mvt[lang]} />
                <ModalContent>
                    <div style={{ width: 600 }} className="p-10">
                        <div className="text-primary t-18">{Lang.info_about_dotation[lang]}</div>
                        <table className="my-15">
                            <tbody>
                                <tr className="mb-5">
                                    <td className="px-5 py-2">
                                        <span>{Lang.bon_type[lang]}</span>&nbsp; : &nbsp;
                                    </td>
                                    <td className="text-default_dark px-5 py-2">Mandragora Mansion - MM</td>
                                </tr>

                                <tr>
                                    <td className="px-5 py-2">
                                        <span>{Lang.bon_amount[lang]}</span>&nbsp; : &nbsp;
                                    </td>
                                    <td className="px-5 py-2 text-default_dark">1,000,000 XFA</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="text-primary t-18">{Lang.amount_of_the_dotation[lang]}</div>
                        <div className="row my-15 px-5">
                            <div className="col-12 col-m-6">
                                <div className="default-text">{Lang.charge_amount[lang]}</div>
                                <TextInput
                                    type="number"
                                    label={Lang.charge_amount[lang]}
                                    placeholder={Lang.charge_amount[lang]}
                                    value={charge_amount.value}
                                    error={charge_amount.error}
                                    helperText={charge_amount.helper}
                                    onValueChange={(val) => setChargeAmount({ value: val, error: false, helper: '' })}
                                />
                            </div>
                            <div className="col-12 col-m-6">
                                <div className="default-text">{Lang.avance_amount[lang]}</div>
                                <TextInput
                                    disabled
                                    label={Lang.avance_amount[lang]}
                                    placeholder={Lang.avance_amount[lang]}
                                    value={advanced_amount}
                                    onValueChange={(val) => setAdvanced(val)}
                                />
                            </div>
                        </div>

                        <div className="row p-10">
                            <FilesChooser />
                        </div>

                        <div className="row">
                            <div className="d-flex content-between items-center w-100">
                                <Button color="danger" onClick={() => cancel()}>
                                    {Lang.cancel[lang]}
                                </Button>
                                <Button color="primary" onClick={() => save()}>
                                    {Lang.validate[lang]}
                                </Button>
                            </div>
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        );
    },
    { displayName: 'AddMVTPopup' }
);
