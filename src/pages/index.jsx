import Layout from "../layout";
import Future from "../components/Future";
import LastProducts from "../components/Lasts";
import MyVideoHosting from "../components/MyVideoHosting";

const Main = ({last_products, future_products}) => {

    return (
        <Layout
          title="Главная | mediahosting"
          content="Главная страница mediahosting"
        >
          <div className="main-container-block">
              {/* Future */}
              {future_products.length > 0 && <Future products={future_products} />}
              
              
              {/* Your Mediahosting */}
              <MyVideoHosting products={last_products} />

              {/* Following */}
              

              {/* Last products */}
              <LastProducts products={last_products} />
          </div>
        </Layout>
    )
}


export async function getStaticProps() {
    const res = await fetch('http://127.0.0.1:8000/api/')
    const data = await res.json()
    const last_products = data.last_products;
    const future_products = data.future_products;

  
    return {
      props: {
        last_products, future_products
      },
    }
  }

export default Main;