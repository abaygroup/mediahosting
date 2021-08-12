import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Layout = (props) => {
    const router = useRouter();

    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.content} />
                <link rel="shortcut icon" href="https://abayst.netlify.app/icon64.png" />
            </Head>
            <div id="root">
                {props.children}

                <nav className="i18next">
                    {router.locales.map(locale => (
                        <Link href={router.asPath} locale={locale} key={locale}><a>{locale.toLocaleUpperCase()}</a></Link>
                    ))}
                </nav>
            </div>
        </React.Fragment>
    )
}

Layout.defaultProps = {
    title: "mediahosting",
    content: "lorem ipsum"
}

export default Layout;