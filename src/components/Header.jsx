import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import Script from 'next/script'
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { CgChevronLeftO, CgChevronRightO } from 'react-icons/cg';
import { AiOutlineUser, AiFillCaretDown } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import Dropdown from './Dropdown';
import { AnimatePresence } from 'framer-motion';

const Header = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user)
    const title = props.header ? `<img src='https://img.icons8.com/color/96/000000/circled-play--v1.png' /><h2>${props.header}</h2>` : ""
    const { t } = useTranslation();
    const [dropdown, setDropdown] = useState(false)

    const toggleDropdown = () => setDropdown(!dropdown);


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
                            document.querySelector('.play').innerHTML = "${title}";
                            document.querySelector('.header').style.background = "${props.color}";
                            // document.querySelector('.header').style.position = "sticky";
                        } else {
                            document.querySelector('.play').innerHTML = ""
                            document.querySelector('.header').style.background = "transparent";
                        }
                    });
                `}
            </Script>
            <div className="header">
                <div className="intro-header">
                    <div className="prev-next">
                        <span onClick={e => prevPage(e)}><CgChevronLeftO /></span>
                        <span onClick={e => nextPage(e)}><CgChevronRightO /></span>
                    </div>

                    <div className="play"></div>
                    
                    <div className="logo">
                        <Link href="/">
                            <a><Image src="/images/full_logo_black.png" width={7200} height={1080} /></a>
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
                                <span className="user" onClick={() => toggleDropdown()}>
                                    <AiOutlineUser />
                                    <span className="in-user">
                                        <small>{user !== null && user.username}</small>
                                        <AiFillCaretDown />
                                    </span>
                                </span>
                                <AnimatePresence>
                                    {dropdown && <Dropdown toggleDropdown={toggleDropdown} logout={logoutHandler} />}
                                </AnimatePresence>
                            </React.Fragment>
                        }
                    </div>

                    {/* Setting */}
                    <div className="setting-link">
                        <Link href={"/setting"}>
                            <a>
                                <FiSettings />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;