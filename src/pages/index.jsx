import Navbar from "../components/Navbar";
import Layout from "../layout";
import useTranslation from 'next-translate/useTranslation'
import Header from "../components/Header";

const Main = () => {
    const { t } = useTranslation();

    return (
        <Layout
            title="Главная | mediahosting"
            content="Главная страница mediahosting"
        >
            <div className="main-container">
                <Navbar />
                <div className="platform">
                    <Header />
                    <h1>{t("common:main.h1")}</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Main;