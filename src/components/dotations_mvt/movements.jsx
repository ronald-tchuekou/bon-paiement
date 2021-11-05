import React from 'react';
import { IconButton } from '../../base/buttons';
import { LangContext } from '../../../src/context';
import { Lang } from '../../../src/lang';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../src/base/section-list';

export const Movements = (props) => {
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
                searchPlaceHolder={Lang.search_mvt[lang]}
                title={Lang.mvt_list[lang]}
            >
                <IconButton color={'warning'}>
                    <i className="fi fi-rr-plus-small t-30"></i>
                </IconButton>
            </SectionListHeader>
            <SectionListContent>
                {list.map((item, i) => (
                    <SectionListItem
                        withOptions
                        onDelete={() => alert('Deletion is not impelement!')}
                        onEdit={() => alert('Edition is not implement!')}
                        selected={current === i}
                        key={i}
                    >
                        <div onClick={() => setCurrent(i)} className="d-flex content-between items-center">
                            <div>
                                <div className="text-default_gray">Mouvement {i}</div>
                                <p className="text-bold t-14 ellipsize text-warning">
                                    <span>Charge: 10,000 XFA</span>
                                    <span>Avance: 5,000 XFA</span>
                                </p>
                                <small className="text-default">Ajouté le 12 Janv 2021</small>
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
