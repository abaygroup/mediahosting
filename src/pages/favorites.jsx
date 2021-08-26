import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../actions/types";
import Layout from "../hocs/layout";
import { useEffect, useState } from "react";
import FullLoader from "../components/FullLoader";

const Favorites = ({last_products}) => {
    const router = useRouter();
    const [lastProducts, setLastProducts] = useState(last_products);
    const { t } = useTranslation();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        async function load() {
            const res = await fetch(`${BACKEND_URL}/api/`)
            const data = await res.json();
            setLastProducts(data.last_products);
        }

        if(!last_products) {
            load()
        }
    }, []);

    if(!lastProducts) {
        return (
            <Layout>
                <FullLoader />
            </Layout>
        )
    }

    if(typeof window !== "undefined" && !isAuthenticated)
        router.push("/accounts/login")

    return (
        <Layout
            title="Настройка | mediahosting"
            content="Настроичная страница mediahosting"
        >
            <div className="main-container-block">
                {isAuthenticated && 
                <div className="favorites">
                    <h1>{t('common:following.h1')}</h1>
                    <div className="block">
                    {lastProducts.map((product, i) => (
                        <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} locale={router.locale} key={i}>
                            <a className="product-box">
                                <div className="picture" >
                                    <Image width={640} height={360} src={product.picture} alt={product.title} />
                                </div>
                                <div className="title">
                                    <h4>{product.title}</h4>
                                    <small>{product.body}</small>
                                </div>
                                <div className="goto">
                                    <Image width={100} height={100} src="https://img.icons8.com/color/96/000000/circled-play--v1.png" alt={product.title} />
                                </div>
                            </a>
                        </Link>
                    ))}
                    </div>
                </div>}
            </div>
        </Layout>
    )
}

Favorites.getInitialProps = async ({req}) => {
    if (!req) {
        return {
            last_products: null
        }
    }
    const res = await fetch(`${BACKEND_URL}/api/`)
    const data = await res.json()
    const last_products = data.last_products;

  
    return {
        last_products
    }
}

export default Favorites;