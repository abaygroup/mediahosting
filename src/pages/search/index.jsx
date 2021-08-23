import Link from "next/link";
import Image from 'next/image';
import { BACKEND_URL } from "../../actions/types";
import SearchForm from "../../components/Search";
import Layout from "../../hocs/layout";
import { useEffect, useState } from "react";
import FullLoader from "../../components/FullLoader";

const Search = ({sup_categories, sub_categories}) => {
    const [supCategories, setSupCategories] = useState(sup_categories);
    const [subCategories, setSubCategories] = useState(sub_categories);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${BACKEND_URL}/api/categories/`)
            const data = await res.json()
            setSupCategories(data.sup_categories);
            setSubCategories(data.sub_categories);
        }

        if(!sup_categories && !sub_categories) {
            load();
        }

    }, [])

    if(!supCategories || !subCategories) {
        return (
            <Layout>
                <FullLoader />
            </Layout>
        )
    }

    return (
        <Layout
            title="Поиск | mediahosting"
            content="Поисковая страница mediahosting"
        >
            <div className="search-container-block">
                <SearchForm />
                {supCategories.map((category, i) => {
                    return (
                        <div className="categories" key={i}>
                            <h1>{category.name}</h1>
                            <div className="sub-categories">
                                {subCategories.map((sub, i) => {
                                    if (sub.super_category === category.id) {
                                        return (
                                            <Link href={`/search/${encodeURIComponent(sub.slug)}`} key={i}>
                                                <a className="category-box">
                                                    <div className="title">
                                                        <h3>{sub.name}</h3>
                                                        <div className="image">
                                                            <Image src={sub.image} width={800} height={800} alt={sub.name} />
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}

Search.getInitialProps = async (context) => {
    if(!context.req) {
        return {
            sup_categories: null, 
            sub_categories: null
        }
    }

    const res = await fetch(`${BACKEND_URL}/api/categories/`)
    const data = await res.json()
    const sup_categories = data.sup_categories;
    const sub_categories = data.sub_categories;

    return {
        sup_categories, 
        sub_categories
    }
}

export default Search;