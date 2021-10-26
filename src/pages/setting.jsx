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
                    <a className="close-btn"><Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAACZklEQVR4nO3cuW7UQByAcXM0tPAiCakIPWcHQhScJWdAVNy0PAcS8BJ5BcSLABI0RBD4KNYrWZZndtn1zDj29ysjZ/2PPm328IyrSpIkSZIkSZIkSZIkSZIkaZSAI8A74FrpWRYBNoBd4ETpWZKoY3xgZn/IUYBN4Es96+dRRmnEmPsNXC09VxuwBXxrzfoJOFZ6tl4Bl4FfrT90H7heera51jOj6U3p2ZIALgWi3BjAbJvA18nEmItEuVlwppOBGK9LzZQVcBHY64hyq8As044xF4jyJ2cUY7REotzOcO5QjFepzz1owIWOKH+BOwnPuWWMiEiUuwnO1fU5wxhtOaJEYrzs6xyjApwPRLnXw2MbYxUpokRivOhz9tGqo/zsiHJ/hcc6BXw3xpoiUR78x2MYo0/AuUCUh0v87nYgxvMcs4/WKlGMkVgkyk7HsdvAD2MkFonyqHFMKMazkrOPFnA2EOUxcNoYBRB+99X+GcCT0vNOQuCZ0va09JyTApyJRDmwMQ6XHmANh0oPoNqS/7J8Mc/BF/UBIfJZBD+D5BWJsdM4xq9MclgmRuNYo6QUieGXi7mxxjURvBbSr0iMpa8aGqUnhK+rr3IJ18UN64jESLHIwSgxhNdmuQwot0iMvhfKuYR0EboXXSdZ34uLrOMCMZKugDdKQCRG8j0ikSjuDWnIuovKKDUGtM+QqW72nIvEKLYTd7JRCO9VH8q26EntUT/INw54W3q23uGtNYaF2c1n3jeeGUO++cwGY7/5TFVVFXAU+AhcKT3LIszeEu8Cx0vPIkmSJEmSJEmSJEmSJEmSlMY/3OIRevlpm58AAAAASUVORK5CYII=" /></a>
                </Link>
                <div className="logo">
                    <Link href={"/"}>
                        <a>
                            <Image src="/icons/logo.png" width={5276} height={730} />
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