import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import FootBar from '../components/FootBar';
import { useDispatch } from 'react-redux';
import { check_auth_status } from '../actions/auth';
import Script from 'next/script'

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
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css" integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q" crossOrigin="anonymous" />
                <meta name="description" content={props.content} />
                <link rel="shortcut icon" href="/icons/m-black.png"/>
            </Head>
            <Script>
                {`
                    localStorage.setItem('prev', localStorage.getItem("currentPage"));
                    localStorage.setItem('currentPage', "${router.asPath}");
                    localStorage.setItem('next', localStorage.getItem("prev"));
                    
                `}
            </Script>
            <div id="root">
                <div className="main-container">
                    <Navbar />
                    <div className="platform">
                        <Header header={props.header} />
                        {props.children}
                    </div>
                </div>
                <FootBar />
                <nav className="i18next">
                    {router.locales.map(locale => (
                        <Link href={router.asPath} locale={locale} key={locale}>
                            <a>
                                {locale === "kz" ? "Қазашқа" : locale === "ru" ? "Русский" : null}
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