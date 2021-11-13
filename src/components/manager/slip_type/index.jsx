import React from 'react';
import { CurrentSlipTypeContext, SlipTypesContext } from '../../../context';
import { SlipTypeList } from './list';
import { SlipTypeForm } from './form';
import SlipType from '../../../models/SlipType';

export const SlipTypes = React.forwardRef(
    (props, ref) => {
        const list_ref = React.useRef(null);

        const [slipTypes, setSlipTypes] = React.useState([]);
        const [currentSlipType, setCurrentSlipType] = React.useState(new SlipType());

        const current_slip_type_context = React.useMemo(() => {
            return {
                currentSlipType: currentSlipType,
                setCurrentSlipType: setCurrentSlipType,
            };
        }, [currentSlipType, setCurrentSlipType]);

        const slip_type_context = React.useMemo(() => {
            return {
                slipTypes: slipTypes,
                setSlipTypes: setSlipTypes,
            };
        }, [slipTypes, setSlipTypes]);

        const initConten = () => {
            setCurrentSlipType(new SlipType());
            setSlipTypes([]);
            list_ref.current.getContent();
        };

        React.useImperativeHandle(ref, () => ({
            refreshContent: initConten,
        }));

        return (
            <SlipTypesContext.Provider value={slip_type_context}>
                <CurrentSlipTypeContext.Provider value={current_slip_type_context}>
                    <div className="col-6 h-100 p-0 m-0">
                        <SlipTypeList ref={list_ref} />
                    </div>
                    <div className="col-6 h-100 p-0 m-0">
                        <SlipTypeForm />
                    </div>
                </CurrentSlipTypeContext.Provider>
            </SlipTypesContext.Provider>
        );
    },
    { displayName: 'SlipTypes' }
);
