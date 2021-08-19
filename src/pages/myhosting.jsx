import MyVideoHosting from "../components/MyVideoHosting";
import Layout from "../layout";

const MyHosting = ({last_products}) => {
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

export default MyHosting;