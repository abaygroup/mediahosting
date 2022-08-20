import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { 
    RiHome5Fill, RiHome5Line, 
    RiSearchFill, RiSearchLine,
    RiUserFollowFill, RiUserFollowLine,
} from 'react-icons/ri';
import { MdFavoriteBorder,  MdFavorite } from 'react-icons/md';



const Navbar = () => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="navbar-container">
            <div className="logo">
                <Link href="/">
                    <a><Image src="/images/full_logo_black.png" width={7200} height={1080} /></a>
                </Link>
            </div>
            <ul className="navbar-list">
                <li className={router.pathname == "/" ? "active" : ""}>
                    <Link href="/">
                        <a>
                            {router.pathname == '/' ?<RiHome5Fill /> : <RiHome5Line />}
                            <span>{t('common:navbar.main')}</span>
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/search" ? "active" : ""}>
                    <Link href="/search">
                        <a>
                            {router.pathname == "/search" ? <RiSearchFill /> : <RiSearchLine /> }
                            <span>{t('common:navbar.search')}</span>
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/following" ? "active" : ""}>
                    <Link href="/following">
                        <a>
                            {router.pathname == "/following" ? <RiUserFollowFill /> : <RiUserFollowLine /> }
                            <span>{t('common:navbar.following')}</span>
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/favorites" ? "active" : ""}>
                    <Link href="/favorites">
                        <a>
                            {router.pathname == "/favorites" ? <MdFavorite /> : <MdFavoriteBorder />}
                            <span>{t('common:navbar.favorites')}</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;