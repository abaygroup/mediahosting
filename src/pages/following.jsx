import Layout from "../layout";

const Following = ({products}) => {
    return (
        <Layout
            title="Подписка | mediahosting"
            content="Все ваше продукты подписке в бренд mediahosting"
        >
            <div className="main-container-block">
                <div className="products">
                    <h2>Продукты, которые вы подписали</h2>
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

export default Following;