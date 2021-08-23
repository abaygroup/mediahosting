import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../actions/types";
import MyVideoHosting from "../components/MyVideoHosting";
import Layout from "../hocs/layout";

const MyHosting = ({last_products}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if(typeof window !== "undefined" && !isAuthenticated)
        router.push("/accounts/login")

    return (
        <Layout
            title="Мой хостинг | mediahosting"
            content="Поисковая страница mediahosting"
        >
            <div className="main-container-block">
                <MyVideoHosting products={last_products} />
            </div>
        </Layout>
    )
}

MyHosting.getInitialProps = async () => {
    const res = await fetch(`${BACKEND_URL}/api/`)
    const data = await res.json()
    const last_products = data.last_products;

  
    return {
        last_products
    }
}

export default MyHosting;