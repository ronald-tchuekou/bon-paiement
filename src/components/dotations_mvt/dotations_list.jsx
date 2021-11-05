import React from 'react';
import { LangContext } from '../../../src/context';
import { Lang } from '../../../src/lang';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../src/base/section-list';

export const DotationsList = (props) => {
    const { lang } = React.useContext(LangContext);

    const [list, setList] = React.useState([]);
    const [current, setCurrent] = React.useState(-1);

    React.useEffect(() => {
        let content = [];
        for (let i = 1; i <= 20; i++) {
            content.push(i);
        }
        setList(content);
    }, []);

    return (
        <SectionList position="right" className="flex-1">
            <SectionListHeader
                search
                onChange={(value) => {}}
                onValidate={(value) => alert(value)}
                searchPlaceHolder={Lang.search_dotation[lang]}
                title={Lang.dotation_list[lang]}
            ></SectionListHeader>
            <SectionListContent>
                {list.map((item, i) => (
                    <SectionListItem selected={current === i} key={i}>
                        <div onClick={() => setCurrent(i)} className="d-flex content-between items-center">
                            <div>
                                <div className="text-default_gray">Mandragora Mansion - MM</div>
                                <p className="text-primary text-bold t-14">1,000,000 XFA</p>
                            </div>
                            {current === i ? (
                                <div className="text-center text-primary">
                                    <i className="fi fi-rr-angle-small-right t-25"></i>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </SectionListItem>
                ))}
            </SectionListContent>
        </SectionList>
    );
};
