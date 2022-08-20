import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


const AccountLayout = (props) => {
    const router = useRouter();

    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.content} />
            </Head>

            <div className="accounts-layout">
                {props.children}
                {/* <nav className="i18next">
                    {router.locales.map(locale => (
                        <Link href={router.asPath} locale={locale} key={locale}>
                            <a>
                                {locale === "ru" ? "Русский" : locale === "kz" ? "Қазашқа" : null}
                            </a>
                        </Link>
                    ))}
                </nav> */}
            </div>
        </React.Fragment>
    )
}

AccountLayout.defaultProps = {
    title: "mediahosting",
    content: "Авторизация"
}

export default AccountLayout;