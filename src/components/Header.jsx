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
                            <a><Image src="/icons/logo-black.png" width={5276} height={730} /></a>
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
                                <Image width={100} height={100} src="https://img.icons8.com/ios/100/000000/settings--v1.png"/>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;