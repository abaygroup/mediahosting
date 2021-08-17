import SearchForm from "../components/Search";
import Layout from "../layout";

const Search = () => {
    return (
        <Layout
            title="Поиск | mediahosting"
            content="Поисковая страница mediahosting"
        >
            <div className="main-container-block">
                <SearchForm />
                <div className="categories">
                    <div className="category-box">
                        <div className="title">
                            <h4>Имформационные технологии</h4>
                            <small>Веб разработка, Кибернетика, Мобильный разработка, Разработка игры</small>
                        </div>
                    </div>
                    <div className="category-box">
                        <div className="title">
                            <h4>Имформационные технологии</h4>
                            <small>Веб разработка, Кибернетика, Мобильный разработка, Разработка игры</small>
                        </div>
                    </div>
                    <div className="category-box">
                        <div className="title">
                            <h4>Имформационные технологии</h4>
                            <small>Веб разработка, Кибернетика, Мобильный разработка, Разработка игры</small>
                        </div>
                    </div>
                    <div className="category-box">
                        <div className="title">
                            <h4>Имформационные технологии</h4>
                            <small>Веб разработка, Кибернетика, Мобильный разработка, Разработка игры</small>
                        </div>
                    </div>
                    <div className="category-box">
                        <div className="title">
                            <h4>Имформационные технологии</h4>
                            <small>Веб разработка, Кибернетика, Мобильный разработка, Разработка игры</small>
                        </div>
                    </div>
                    <div className="category-box">
                        <div className="title">
                            <h4>Имформационные технологии</h4>
                            <small>Веб разработка, Кибернетика, Мобильный разработка, Разработка игры</small>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search;