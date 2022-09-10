import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import FootBar from '../components/FootBar';
import { useDispatch } from 'react-redux';
import { check_auth_status } from '../actions/auth';
import Script from 'next/script'
import Link from 'next/link';


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
                        <Header header={props.header} color={props.color} />
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
    title: "Mediahosting",
    content: "Mediahosting - бұл заманауи технологиялармен өңделген, ақпарат берудің жетілдірілген онлайн платформасы."
}

export default Layout;