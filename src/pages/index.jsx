import Layout from "../layout";
import MyVideoHosting from "../components/Myhosting";
import Future from "../components/Future";

const Main = ({products}) => {

    return (
        <Layout
            title="Главная | mediahosting"
            content="Главная страница mediahosting"
        >
            <div className="main-container-block">
                {/* Future */}
                <Future products={products} />
                
                {/* Your Mediahosting */}
                <MyVideoHosting products={products} />

                {/* Popular */}
                <div className="products">
                    <h2>Популярные</h2>
                    <div className="block">
                    {products.map((product, i) => (
                        <div className="product-box" key={i}>
                            <div className="picture" >
                                <img src={product.picture} alt="" />
                            </div>
                            <div className="title">
                                <h4>{product.title}</h4>
                                <small>{product.body}</small>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
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

export default Main;