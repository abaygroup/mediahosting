import Navbar from "../components/Navbar";
import Layout from "../layout";

const MyHosting = () => {
    return (
        <Layout
            title="Поиск | mediahosting"
            content="Поисковая страница mediahosting"
        >
            <div className="main-container">
                <Navbar />
                <div className="platform">
                    <h1>My hosting page</h1>
                </div>
            </div>
        </Layout>
    )
}

export default MyHosting;