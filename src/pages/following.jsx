import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../actions/types";
import Layout from "../hocs/layout";

const Following = ({last_products}) => {
    const router = useRouter();
    const { t } = useTranslation();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if(typeof window !== "undefined" && !isAuthenticated)
        router.push("/accounts/login")
    
    return (
        <Layout
            title="Подписка | mediahosting"
            content="Все ваше продукты подписке в бренд mediahosting"
        >
            <div className="main-container-block">
                <div className="products">
                    <h1>{t('common:following.h1')}</h1>
                    <div className="block">
                    {last_products.map((product, i) => (
                        <Link href={"/"} key={i}>
                            <a className="product-box">
                                <div className="picture" >
                                    <img src={product.picture} alt="" />
                                </div>
                                <div className="title">
                                    <h4>{product.title}</h4>
                                    <small>{product.body}</small>
                                </div>
                                <div className="goto">
                                    <img src="https://img.icons8.com/color/96/000000/circled-play--v1.png"/>
                                </div>
                            </a>
                        </Link>
                        
                    ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${BACKEND_URL}/api/`)
    const data = await res.json()
    const last_products = data.last_products;

  
    return {
      props: {
        last_products
      },
    }
  }

export default Following;