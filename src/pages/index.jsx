import Layout from "../hocs/layout";
import Future from '../components/Future';
import ProductsList from "../components/ProductsList";
import { BACKEND_URL } from "../actions/types";
import { useSelector } from "react-redux";
import useTranslation from 'next-translate/useTranslation'
import UsersList from "../components/UsersList";


const Main = ({authors, future_products, favorites_products, following_products, my_mediahosting, last_products}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { t } = useTranslation();
    return (
        <Layout
          title={t("common:main.head.title")}
          content={t("common:main.head.content")}
        >
            <div className="main-container-block">
                {/* Future */}
                {future_products.length > 0 && <Future products={future_products} />}
                
                {/* Last products */}
                {last_products.length > 0 && <ProductsList title={t("common:main.h5")} url={"search"} subheader={t("common:main.sub2")} products={last_products} />}

                {/* Authors */}
                <UsersList title={t("common:main.h6")} subheader={t("common:main.sub6")} authors={authors} url={"search"} />
                
                {/* Your Mediahosting */}
                {(isAuthenticated && my_mediahosting.length > 0) && <ProductsList title={t("common:main.h4")} url={"myhosting"} subheader={t("common:main.sub4")} products={my_mediahosting} />}

                {/* Following */} 
                {(isAuthenticated && following_products.length > 0) && <ProductsList title={t("common:main.h2")} url={"following"} subheader={t("common:main.sub5")} products={following_products} />}
                
                {/* Favorites */}
                {(isAuthenticated && favorites_products.length > 0) && <ProductsList title={t("common:main.h3")} url={"favorites"} subheader={t("common:main.sub3")} products={favorites_products} />}
            </div>
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
    const res = await fetch(`${BACKEND_URL}/api/`, context.req.cookies.access && config)
    const data = await res.json();
    const future_products = data.future_products;
    const favorites_products = data.favorites_products || null;
    const following_products = data.following_products || null;
    const my_mediahosting = data.my_mediahosting || null;
    const last_products = data.last_products;
    const authors = data.authors;

    return {
        props: {
            future_products,
            favorites_products,
            following_products,
            my_mediahosting,
            last_products,
            authors
        }
    }
}

export default Main;