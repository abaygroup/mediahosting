import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import FootBar from '../components/FootBar';
import { useDispatch } from 'react-redux';
import { check_auth_status } from '../actions/auth';


const Layout = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.content} />
                <link rel="shortcut icon" href="/icons/m-black.png"/>
            </Head>
            <div id="root">
            <div className="main-container">
                <Navbar />
                <div className="platform">
                    <Header />
                    {props.children}
                </div>
            </div>
            <FootBar />
            <nav className="i18next">
                {router.locales.map(locale => (
                    <Link href={router.asPath} locale={locale} key={locale}>
                        <a>
                            {locale === "ru" ? "Русский" : locale === "kz" ? "Қазашқа" : null}
                        </a>
                    </Link>
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