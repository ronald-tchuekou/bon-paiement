import React from 'react';
import { IconButton } from '../../base/buttons';
import { LangContext } from '../../../src/context';
import { Lang } from '../../../src/lang';
import { SectionList, SectionListContent, SectionListHeader } from '../../../src/base/section-list';

export const Beneficiers = (props) => {
    const { lang } = React.useContext(LangContext);

    const [beneficiers, setBeneficiers] = React.useState([]);

    React.useEffect(() => {}, []);

    return (
        <SectionList position="right" className="flex-2">
            <SectionListHeader
                search
                onChange={(value) => {}}
                onValidate={(value) => alert(value)}
                searchPlaceHolder={Lang.search_beneficiers[lang]}
                title={Lang.beneficiers_of_mvt[lang]}
            >
                <IconButton color={'warning'}>
                    <i className="fi fi-rr-plus-small t-30"></i>
                </IconButton>
            </SectionListHeader>
            <SectionListContent></SectionListContent>
        </SectionList>
    );
};
