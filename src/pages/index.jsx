import Layout from "../hocs/layout";
import Future from "../components/Future";
import LastProducts from "../components/Lasts";
import MyVideoHosting from "../components/MyVideoHosting";
import { BACKEND_URL } from "../actions/types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FullLoader from "../components/FullLoader";

const Main = ({last_products, future_products}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [futureProducts, setFutureProducts] = useState(future_products);
    const [lastProducts, setLastProducts] = useState(last_products);

    useEffect(() => {
        async function load() {
            const res = await fetch(`${BACKEND_URL}/api/`)
            const data = await res.json();
            setFutureProducts(data.future_products);
            setLastProducts(data.last_products);
        }

        if(!last_products && !future_products) {
            // setTimeout(() => load(), 100000)
            load()
        }
    }, [])

    if(!futureProducts || !lastProducts) {
        return (
            <Layout>
                <FullLoader />
            </Layout>
        )
    }

    return (
        <Layout
          title="Главная | mediahosting"
          content="Главная страница mediahosting"
        >
            <div className="main-container-block">
                {/* Future */}
                {futureProducts.length > 0 && <Future products={futureProducts} />}
                
                
                {/* Your Mediahosting */}
                {isAuthenticated && <MyVideoHosting products={lastProducts} />}

                {/* Following */}
                
                {/* Last products */}
                <LastProducts products={lastProducts} />
            </div>
        </Layout>
    )
}


Main.getInitialProps = async (context) => {
    if(!context.req) {
        return {
            last_products: null,
            future_products: null
        }
    }

    const res = await fetch(`${BACKEND_URL}/api/`)
    const data = await res.json()
    const last_products = data.last_products;
    const future_products = data.future_products;
  
    return {
      last_products, 
      future_products
    }
}

export default Main;