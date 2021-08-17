import MyVideoHosting from "../components/Myhosting";
import Layout from "../layout";

const MyHosting = ({products}) => {
    return (
        <Layout
            title="Мой хостинг | mediahosting"
            content="Поисковая страница mediahosting"
        >
            <div className="main-container-block">
                <MyVideoHosting products={products} />
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://api.abaystreet.com/api/')
    const products = await res.json()
  
    return {
      props: {
        products,
      },
    }
}

export default MyHosting;