import React from 'react';
import Head from 'next/head';
import { LangContext } from '../src/context';
import { Lang } from '../src/lang';
import { TextInput } from '../src/base/input_text';

export default function Home() {
    const [lang, setLang] = React.useState('fr');
    const [value, setValue] = React.useState('');
    const lang_context = React.useMemo(() => {
        return {
            lang: lang,
            setLang: setLang,
        };
    }, [lang, setLang]);
    return (
        <LangContext.Provider value={lang_context}>
            <Head>
                <title>{Lang.app_name[lang]}</title>
                <meta
                    name="description"
                    content="Application de gestion de bon de paiement"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="m-50">
                <TextInput
                    value={value}
                    placeholder={'Enter your name....'}
                    onValueChange={(val) => setValue(val)}
                />
                <TextInput
                    type={'time'}
                    value={value}
                    placeholder={'Enter your name....'}
                    onValueChange={(val) => setValue(val)}
                />
                <TextInput
                    value={value}
                    error
                    helperText={'Major plot twist! The Selectors 4 WD was just'}
                    placeholder={'Enter your name....'}
                    onValueChange={(val) => setValue(val)}
                />
                <TextInput
                    type={'password'}
                    value={value}
                    placeholder={'Enter your name....'}
                    onValueChange={(val) => setValue(val)}
                />
            </main>
        </LangContext.Provider>
    );
}
