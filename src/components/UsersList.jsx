import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

const UsersList = ({authors, title, subheader, url}) => {
    const { t } = useTranslation();

    console.log(authors);
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
                                <Image width={24} height={24} src="https://img.icons8.com/fluent/48/000000/verified-badge.png" alt="" />
                            </div>}
                            <div className="avatar" >
                                <Image width={512} height={512} src={author.avatar ? author.avatar : "/icons/avatar.jpg"} alt={author.user.username} />
                            </div>
                            <div className="full-name">
                                <h4>{author.user.profile_name}</h4>
                            </div>
                            <div className="goto">
                                <Image width={100} height={100} src="https://img.icons8.com/color/96/000000/circled-play--v1.png"/>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>    
        </div>
    )
}

export default UsersList;