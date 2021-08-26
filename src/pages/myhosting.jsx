import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../actions/types";
import Layout from "../hocs/layout";
import useTranslation from "next-translate/useTranslation";


const MyHosting = ({my_mediahosting}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { t } = useTranslation();


    if(typeof window !== "undefined" && !isAuthenticated)
        router.push("/accounts/login")

    return (
        <Layout
            title="Мой медиахостинг | mediahosting"
            content="Поисковая страница mediahosting"
        >
            {isAuthenticated && <div className="main-container-block">
                <div className="my-videohosting">
                    <h1>{t("common:main.h2")}</h1>
                    <div className="block">
                    {my_mediahosting && my_mediahosting.map((product, i) => (
                        <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                            <a className="product-box">
                                <div className="picture" >
                                    <Image width={1280} height={720} src={product.picture} alt={product.title} />
                                </div>
                                <div className="title">
                                    <h4>{product.title}</h4>
                                    <small>{product.body}</small>
                                </div>
                                <div className="goto">
                                    <Image width={100} height={100} src="https://img.icons8.com/color/96/000000/circled-play--v1.png"/>
                                </div>
                            </a>
                        </Link>
                    ))}
                    </div>
                </div>
            </div>}
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    }
    const res = await fetch(`${BACKEND_URL}/api/mymediahosting/`, context.req.cookies.access && config)
    const my_mediahosting = await res.json()
  
    return {
        props: {
            my_mediahosting
        }
    }
}

export default MyHosting;