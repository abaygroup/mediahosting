import useTranslation from "next-translate/useTranslation";
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
            title="Избранные | mediahosting"
            content="Избранная страница mediahosting"
        >
            {isAuthenticated &&<div className="main-container-block">
                <div className="favorites">
                    <h1>{t('common:following.h1')}</h1>
                    <div className="block">
                    {favorites_products && favorites_products.map((obj, i) => (
                        <Link href={`/product/${encodeURIComponent(obj.product.isbn_code)}`} locale={router.locale} key={i}>
                            <a className="product-box">
                                <div className="picture" >
                                    <Image width={1280} height={720} src={obj.product.picture} alt={obj.product.title} />
                                </div>
                                <div className="title">
                                    <h4>{obj.product.title}</h4>
                                    <small>{obj.product.body}</small>
                                </div>
                                <div className="goto">
                                    <Image width={100} height={100} src="https://img.icons8.com/color/96/000000/circled-play--v1.png" alt={obj.product.title} />
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