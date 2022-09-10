import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

import { AiFillPlayCircle } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';


const UsersList = ({authors, title, subheader, url}) => {
    const { t } = useTranslation();

    return (
        <div className="authors-list">
            <div className="head">
                <div className="left">
                    <h1>{title}</h1>
                    <small className="sub-header">{subheader}</small>
                </div>

                <div className="right">
                    <Link href={`/${url}`}><a>{t("common:main.more")}</a></Link>
                </div>
                
            </div>
            
            <div className="authors">
                {authors.map((author, i) => (
                    <Link href={`/profile/${encodeURIComponent(author.user.username)}`} key={i}>
                        <a className="author-box">
                            {author.branding &&
                            <div className="checked">
                                <BsCheckCircle />
                            </div>}
                            <div className="avatar" >
                                <Image width={512} height={512} src={author.image ? author.image : "/icons/avatar.jpg"} alt={author.user.username} />
                            </div>
                            <div className="full-name">
                                <h4>{author.user.full_name}</h4>
                            </div>
                            <div className="goto">
                                <AiFillPlayCircle />
                            </div>
                        </a>
                    </Link>
                ))}
            </div>    
        </div>
    )
}

export default UsersList;