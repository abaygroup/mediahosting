import useTranslation from "next-translate/useTranslation";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../actions/types";
import Layout from "../hocs/layout";


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
                    <div className="head">
                        <h1>{t('common:favorites.h1')}</h1>
                    </div>
                    <div className="block">
                    {favorites_products && favorites_products.map((product, i) => (
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
                                    <Image width={100} height={100} src="https://img.icons8.com/color/96/000000/circled-play--v1.png" alt={product.title} />
                                </div>
                            </a>
                        </Link>
                    ))}
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