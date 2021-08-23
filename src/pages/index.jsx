import Layout from "../hocs/layout";
import Future from "../components/Future";
import LastProducts from "../components/Lasts";
import MyVideoHosting from "../components/MyVideoHosting";
import { BACKEND_URL } from "../actions/types";
import { useSelector } from "react-redux";

const Main = ({last_products, future_products}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Layout
          title="Главная | mediahosting"
          content="Главная страница mediahosting"
        >
            <div className="main-container-block">
            {/* Future */}
            {future_products.length > 0 && <Future products={future_products} />}
              
              
            {/* Your Mediahosting */}
            {isAuthenticated && <MyVideoHosting products={last_products} />}

            {/* Following */}
              
            {/* Last products */}
            <LastProducts products={last_products} />
            </div>
        </Layout>
    )
}


Main.getInitialProps = async () => {
    const res = await fetch(`${BACKEND_URL}/api/`)
    const data = await res.json()
    const last_products = data.last_products;
    const future_products = data.future_products;
  
    return {
      last_products, future_products
    }
}

export default Main;