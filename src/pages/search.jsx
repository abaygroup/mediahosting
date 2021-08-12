import Navbar from "../components/Navbar";
import Layout from "../layout";

const Search = () => {
    return (
        <Layout
            title="Поиск | mediahosting"
            content="Поисковая страница mediahosting"
        >
            <div className="main-container">
                <Navbar />
                <div className="platform">
                    <h1>Search page</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Search;