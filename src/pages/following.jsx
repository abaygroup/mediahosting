import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Layout from "../layout";

const Following = ({last_products}) => {
    const { t } = useTranslation();

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
    const res = await fetch('http://127.0.0.1:8000/api/')
    const data = await res.json()
    const last_products = data.last_products;

  
    return {
      props: {
        last_products
      },
    }
  }

export default Following;