import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

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
                            <div className="avatar" >
                                <Image width={512} height={512} src={author.avatar ? author.avatar : "/icons/avatar.jpg"} alt={author.user.username} />
                            </div>
                            <div className="full-name">
                                <h4>{author.user.profile_name}</h4>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>    
        </div>
    )
}

export default UsersList;