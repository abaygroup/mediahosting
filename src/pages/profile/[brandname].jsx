import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import { BACKEND_URL } from '../../actions/types';
import Layout from '../../hocs/layout';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';


const Profile = ({profile, products, production_count}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const router = useRouter();
    const { t } = useTranslation()

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <Layout
            title={profile !== null && `${profile.brand.brandname} | Профиль`}
            content="Страница профиля"
        >   
            {isAuthenticated &&
            <div className="profile-container">
                <div className="head" style={{backgroundImage: `url(${profile.logotype})`}}>
                    <div className="backdrop">
                        <Image src={profile.logotype ? profile.logotype : "/icons/noimage.jpg"} width={512} height={512} />
                        <div className="profile-name" onClick={() => alert("hello wolrd")}>
                            <h4 className="branding">{profile.branding ? 
                                <>
                                    <Image width={100} height={100} src="https://img.icons8.com/fluent/48/000000/verified-badge.png" alt="" />
                                    <span>{t("common:profile.branding")}</span>
                                </>
                                : 
                                <span>Профиль</span>}
                            </h4>
                            <h1>{profile.first_name && profile.last_name ? <p>{profile.first_name} {profile.last_name}</p> : router.query.brandname}</h1>
                            <small>{production_count} {t("common:profile.production_count")}</small>
                        </div>
                    </div>
                </div>
                
                {products.length > 0 &&
                <div className="profile-block">
                    <h2>{t("common:profile.product_head")}</h2>
                    <div className="block">
                    {products.map((product, i) => (
                        <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                            <a className="product-box">
                                <div className="picture" >
                                    <Image width={1920} height={1080} src={product.picture ? product.picture : "/icons/noimage.jpg"} alt="" />
                                </div>
                                <div className="title">
                                    <h4>{product.title}</h4>
                                    <small>{product.about}</small>
                                </div>
                                <div className="goto">
                                    <Image width={100} height={100} src="https://img.icons8.com/color/96/000000/circled-play--v1.png"/>
                                </div>
                            </a>
                        </Link>
                    ))}
                    </div>
                </div>}
            </div>}
        </Layout>
    )
}

export async function getServerSideProps(context) {
    if (!context.req.cookies.access) {
        return {
            props: {
              profile: null,
              products: null,
              production_count: null,
            },
          }
    } 

    const response = await fetch(`${BACKEND_URL}/api/profile/${context.params.brandname}/`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    })
    
    const data = await response.json()
    const profile = data.profile;
    const products = data.products;
    const production_count = data.production_count;

    return {
        props: {
            profile,
            products,
            production_count
        },
    }
}


export default Profile;