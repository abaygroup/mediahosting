import Link from "next/link";
import Image from 'next/image';
import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../actions/types";
import Layout from "../hocs/layout";
import useTranslation from "next-translate/useTranslation";
import { AiFillPlayCircle } from 'react-icons/ai';


const MyHosting = ({my_mediahosting}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { t } = useTranslation();


    if(typeof window !== "undefined" && !isAuthenticated)
        router.push("/accounts/login")

    return (
        <Layout
            title={t("common:mymediahosting.head.title")}
            content={t("common:mymediahosting.head.content")}
        >
            {isAuthenticated && <div className="main-container-block">
                <div className="my-videohosting">
                    {my_mediahosting.length > 0 &&
                        <div className="head">
                            <h1>{t("common:mymediahosting.h1")}</h1>
                        </div>
                    }
                    <div className="block">
                    {my_mediahosting.length > 0 ? my_mediahosting.map((product, i) => (
                        <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                            <a className="product-box">
                                <div className="picture" >
                                    <Image width={1280} height={720} src={product.album ? product.album : "/icons/noimage.jpg"} alt={product.title} />
                                </div>
                                <div className="title">
                                    <h4>{product.title}</h4>
                                    <small>
                                        {product.authors.length > 0 && product.authors.map(item => (
                                        <React.Fragment key={item.id}>{item.profile_name + ", "}</React.Fragment>))}
                                    </small>
                                    <small className="counts">{product.observers.length} людею и {product.favorites.length} лайков</small>
                                </div>
                                <div className="goto">
                                    <AiFillPlayCircle />
                                </div>
                            </a>
                        </Link>
                    ))
                    :
                        <div className="no-content">
                            <Image width={100} height={100} src="https://img.icons8.com/ios-filled/100/000000/google-play.png"/>
                            <h3>Cіз жасап шығарған релиздер әзірше жоқ</h3>
                        </div>
                    }
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