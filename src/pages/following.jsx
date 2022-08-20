import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../actions/types";
import Layout from "../hocs/layout";
import { AiFillPlayCircle } from 'react-icons/ai';
import {  RiUserFollowLine } from 'react-icons/ri';


const Following = ({following_products}) => {
    const router = useRouter();
    const { t } = useTranslation();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if(typeof window !== "undefined" && !isAuthenticated)
        router.push("/accounts/login")
    
    return (
        <Layout
            title={t("common:following.head.title")}
            content={t("common:following.head.content")}
        >
            {isAuthenticated && <div className="main-container-block">
                <div className="following">
                    {following_products.length > 0 &&
                    <div className="head">
                        <h1>{t('common:following.h1')}</h1>
                    </div>}
                    <div className="block">
                        {following_products.length > 0 ? following_products.map((product, i) => (
                            <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} locale={router.locale} key={i}>
                                <a className="product-box">
                                    <div className="picture" >
                                        <Image width={1280} height={720} src={product.album ? product.album : "/icons/noimage.jpg"} alt={product.title} />
                                    </div>
                                    <div className="title">
                                        <h4>{product.title}</h4>
                                        <small>
                                            {product.authors.length > 0 && product.authors.map(item => (
                                            <React.Fragment key={item.id}>{item.profile_name + ", "}</React.Fragment>))}
                                        </small>
                                        <small className="counts">{product.observers.length} людею и {product.favorites.length} лайков</small>
                                    </div>
                                    <div className="goto">
                                        <AiFillPlayCircle />
                                    </div>
                                </a>
                            </Link>
                        ))
                        :
                            <div className="no-content">
                                <RiUserFollowLine />
                                <h3>Cіз тіркелген курстар әзірше жоқ</h3>
                            </div>
                        }
                    </div>
                </div>
            </div>}
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    }
    const res = await fetch(`${BACKEND_URL}/api/following/`, context.req.cookies.access && config)
    const following_products = await res.json()

  
    return {
        props: {
            following_products
        }
    }
}

export default Following;