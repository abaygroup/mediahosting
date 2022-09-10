import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { BsChevronLeft } from 'react-icons/bs';


const AccountLayout = (props) => {
    const router = useRouter();

    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.content} />
            </Head>

            <div className="accounts-layout">
            <div className="accounts-container">
                <div className="head">
                    <Link href="/">
                        <a className="back"><BsChevronLeft /></a>
                    </Link>
                    <Link href="/"><a><Image width={7200} height={1080} src="/images/full_logo_white.png" /></a></Link>
                </div>
                {props.children}
            </div>
            </div>
            <nav className="i18next">
                {router.locales.map(locale => (
                    <Link href={router.asPath} locale={locale} key={locale}>
                        <a>
                            {locale === "ru" ? "Русский" : locale === "kz" ? "Қазашқа" : null}
                        </a>
                    </Link>
                ))}
            </nav>
        </React.Fragment>
    )
}

AccountLayout.defaultProps = {
    title: "Mediahosting",
    content: "Mediahosting - бұл заманауи технологиялармен өңделген, ақпарат берудің жетілдірілген онлайн платформасы."
}

export default AccountLayout;