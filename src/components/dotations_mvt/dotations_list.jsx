import React from 'react';
import Head from 'next/head';
import { IconButton } from '../../base/buttons';
import { LangContext } from '../../../src/context';
import { Lang } from '../../../src/lang';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../src/base/section-list';

export const DotationsList = (props) => {
    const { lang } = React.useContext(LangContext);

    const [list, setList] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

    return (
        <SectionList position="right">
            <SectionListHeader
                search
                onChange={(value) => console.log(value)}
                onValidate={(value) => alert(value)}
                searchPlaceHolder={Lang.search_dotation[lang]}
                title={Lang.dotation_list[lang]}
            >
                <IconButton color={'warning'}>
                    <i className="fi fi-rr-add"></i>
                </IconButton>
            </SectionListHeader>
            <SectionListContent>
                {list.map((item, i) => (
                    <SectionListItem selected={1 === i} key={i}>
                        <div className="text-default">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                        <small className="text-default">Il y a 3h</small>
                    </SectionListItem>
                ))}
            </SectionListContent>
        </SectionList>
    );
};
