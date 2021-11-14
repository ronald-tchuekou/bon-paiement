import React from 'react';
import { CurrentDotationContext, DotationsContext } from '../../../context';
import { DotationList } from './list';
import { DotationForm } from './form';
import Dotation from '../../../models/Dotation';

export const Dotations = React.forwardRef(
    (props, ref) => {
        const list_ref = React.useRef(null);

        const [dotations, setDotations] = React.useState([]);
        const [currentDotation, setCurrentDotation] = React.useState(new Dotation());

        const current_dotation_context = React.useMemo(() => {
            return {
                currentDotation: currentDotation,
                setCurrentDotation: setCurrentDotation,
            };
        }, [currentDotation, setCurrentDotation]);

        const dotation_context = React.useMemo(() => {
            return {
                dotations: dotations,
                setDotations: setDotations,
            };
        }, [dotations, setDotations]);

        const initConten = () => {
            setCurrentDotation(new Dotation());
            setDotations([]);
            list_ref.current.getContent();
        };

        React.useImperativeHandle(ref, () => ({
            refreshContent: initConten,
        }));

        return (
            <DotationsContext.Provider value={dotation_context}>
                <CurrentDotationContext.Provider value={current_dotation_context}>
                    <div className="col-6 h-100 p-0 m-0">
                        <DotationList ref={list_ref} />
                    </div>
                    <div className="col-6 h-100 p-0 m-0">
                        <DotationForm />
                    </div>
                </CurrentDotationContext.Provider>
            </DotationsContext.Provider>
        );
    },
    { displayName: 'Dotations' }
);
