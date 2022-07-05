import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import Script from 'next/script'
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';


const Header = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user)
    const title = props.header ? `<img src='https://img.icons8.com/color/96/000000/circled-play--v1.png' /><h2>${props.header}</h2>` : ""
    const { t } = useTranslation();

    const logoutHandler = () => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(logout())
        }
    }

    const prevPage = (e) => {
        e.preventDefault();
        if (typeof window !== "undefined" && isAuthenticated)
            router.push(localStorage.getItem("prev"));
    }

    const nextPage = (e) => {
        e.preventDefault();
        if (typeof window !== "undefined" && isAuthenticated)
            router.push(localStorage.getItem("next"));
    }

    return (
        <>
            <Script>
                {`
                    var platform = document.querySelector('.platform');

                    platform.addEventListener('scroll', function() {
                        if (platform.scrollTop > 60) {
                            document.querySelector('.header').classList.add('sticky')
                            document.querySelector('.play').innerHTML = "${title}"
                        } else {
                            document.querySelector('.header').classList.remove('sticky');
                            document.querySelector('.play').innerHTML = ""
                        }
                    });
                    
                `}
            </Script>
            <div className="header">
                <div className="intro-header">
                    <div className="prev-next">
                        <span onClick={e => prevPage(e)}>Пред.</span>
                        <span onClick={e => nextPage(e)}>След.</span>
                    </div>
                    <div className="play">
                        
                    </div>
                    <div className="logo">
                        <Link href="/">
                            <a><Image src="/icons/logo.png" width={5276} height={730} /></a>
                        </Link>
                    </div>
                    <div className="account">
                        {!isAuthenticated ? 
                            <React.Fragment>
                                <Link href="/accounts/register">
                                    <a className="register">{t("common:header.register")}</a>
                                </Link>
                                <Link href="/accounts/login">
                                    <a className="login">{t("common:header.login")}</a>
                                </Link>
                            </React.Fragment>    
                        : 
                            <React.Fragment>
                                <Link href={user !== null ? `/profile/${encodeURIComponent(user.username)}`: "/"}>
                                    <a className="user">
                                        <Image width={100} height={100} src="data:image/png;base64,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"/>
                                        <span>{user !== null && user.username}</span>
                                    </a>
                                </Link>
                                <span className="logout" onClick={logoutHandler} title={t("common:header.logout-title")}>
                                    Выйти
                                </span>
                            </React.Fragment>
                        }
                    </div>

                    {/* Setting */}
                    <div className="setting-link">
                        <Link href={"/setting"}>
                            <a>
                                <Image width={100} height={100} src="data:image/png;base64,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" />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;