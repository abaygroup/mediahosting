import Navbar from "../components/Navbar";
import Layout from "../layout";

const Settings = () => {
    return (
        <Layout
            title="Настройка | mediahosting"
            content="Настроичная страница mediahosting"
        >
            <div className="main-container">
                <Navbar />
                <div className="platform">
                    <h1>Settings page</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Settings;