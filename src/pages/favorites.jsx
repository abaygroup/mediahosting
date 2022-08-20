import useTranslation from "next-translate/useTranslation";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../actions/types";
import Layout from "../hocs/layout";
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';




const Favorites = ({favorites_products}) => {
    const router = useRouter();
    const { t } = useTranslation();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if(typeof window !== "undefined" && !isAuthenticated)
        router.push("/accounts/login")

    return (
        <Layout
            title={t('common:favorites.head.title')}
            content={t('common:favorites.head.content')}
        >
            {isAuthenticated &&<div className="main-container-block">
                <div className="favorites">
                    {favorites_products.length > 0 &&
                        <div className="head">
                            <h1>{t('common:favorites.h1')}</h1>
                        </div>}
                    <div className="block">
                    {favorites_products.length > 0 ? favorites_products.map((product, i) => (
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
                            <MdFavoriteBorder />
                            <h3>Cіз таңдап алған курстар әзірше жоқ</h3>
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
    const res = await fetch(`${BACKEND_URL}/api/favorites/`, context.req.cookies.access && config)
    const favorites_products = await res.json()

    return {
        props: {
            favorites_products
        }
    }
}

export default Favorites;