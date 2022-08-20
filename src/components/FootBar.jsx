import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { 
    RiHome5Fill, RiHome5Line, 
    RiSearchFill, RiSearchLine,
    RiUserFollowFill, RiUserFollowLine,
} from 'react-icons/ri';
import { MdFavoriteBorder,  MdFavorite } from 'react-icons/md';


const FootBar = () => {
    const router = useRouter();

    return (
        <div className="footbar">
            <ul>
            <li className={router.pathname == "/" ? "active" : ""}>
                    <Link href="/">
                        <a>
                            {router.pathname == '/' ?<RiHome5Fill /> : <RiHome5Line />}
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/search" ? "active" : ""}>
                    <Link href="/search">
                        <a>
                            {router.pathname == "/search" ? <RiSearchFill /> : <RiSearchLine /> }
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/following" ? "active" : ""}>
                    <Link href="/following">
                        <a>
                            {router.pathname == "/following" ? <RiUserFollowFill /> : <RiUserFollowLine /> }
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/favorites" ? "active" : ""}>
                    <Link href="/favorites">
                        <a>
                            {router.pathname == "/favorites" ? <MdFavorite /> : <MdFavoriteBorder />}
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default FootBar;