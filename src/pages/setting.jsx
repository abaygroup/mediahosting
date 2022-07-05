import React from 'react';
import Layout from '../hocs/layout';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import { useRouter } from 'next/router';


const Setting = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user)

    const logoutHandler = () => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(logout())
        }
    }


    return (
        <Layout
            title="Настройка - mediahosting"
            content="Вход на mediahosting, Аккаунты и настройки"
        >
            <div className="setting-container">
                <Link href={"/"}>
                    <a className="close-btn">
                        <Image width={100} height={100} src="https://img.icons8.com/ios/100/000000/delete-sign--v1.png"/>
                    </a>
                </Link>
                <div className="logo">
                    <Link href={"/"}>
                        <a>
                            <Image src="/icons/logo-black.png" width={5276} height={730} />
                        </a>
                    </Link>
                </div>
                <ul>
                    {!isAuthenticated ? 
                        <React.Fragment>
                            <li>
                                <Link href="https://dashboard.abaystreet.com/accounts/register">
                                    <a target="_blank" className="register">Регистрация</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/accounts/login">
                                    <a className="login">Вход</a>
                                </Link>
                            </li>
                            {router.locales.map(locale => (
                                <li key={locale}>
                                    <Link href={router.asPath} locale={locale}>
                                        <a>{locale === "ru" ? "Русский" : locale === "kz" ? "Қазашқа" : null}</a>
                                    </Link>
                                </li>
                            ))}
                        </React.Fragment>    
                    : 
                        <React.Fragment>
                            <li>
                                <Link href={user !== null ? `/profile/${encodeURIComponent(user.username)}`: "/"}>
                                    <a className="user">
                                        <span>Профиль</span>
                                    </a>
                                </Link>
                            </li>
                            {router.locales.map(locale => (
                                <li key={locale}>
                                    <Link href={router.asPath} locale={locale}>
                                        <a>{locale === "ru" ? "Русский" : locale === "kz" ? "Қазашқа" : null}</a>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <span className="logout" onClick={logoutHandler}>Выйти</span>
                            </li>
                        </React.Fragment>
                    }
                </ul>
            </div>
        </Layout>
    )
}

export default Setting;