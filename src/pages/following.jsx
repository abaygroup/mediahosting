import Navbar from "../components/Navbar";
import Layout from "../layout";

const Following = () => {
    return (
        <Layout
            title="Мой хостинг | mediahosting"
            content="Все ваше продукты подписке в бренд mediahosting"
        >
            <div className="main-container">
                <Navbar />
                <div className="platform">
                    <h1>Following page</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Following;