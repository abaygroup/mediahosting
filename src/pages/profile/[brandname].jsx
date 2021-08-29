import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BACKEND_URL } from '../../actions/types';
import Layout from '../../hocs/layout';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';


const Profile = ({profile, products, favorites, production_count, access}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const router = useRouter();
    const { t } = useTranslation();
    const [favoritesData, setFavoritesData] = useState(favorites);

    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                }
            }
            const response = await fetch(`${BACKEND_URL}/api/profile/${router.query.brandname}/`, access && config);
            const data = await response.json()
            if (!cleanupFunction) {
                setFavoritesData(data.favorites)
            }
        }

        fetchData();
        return () => cleanupFunction = true; 
    }, [favoritesData]);

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    const editProfile = () => {
        alert("Эти компоненты еще не готовы. Предпологаем следующее версий")
    }

    // Add To Favorite Handle
    const addToFavorite = async (isbn_code) => {
        try {
            await fetch(`${BACKEND_URL}/api/favorites/${isbn_code}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                }
            })
        } catch(e) {
            console.log(e);
        }
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
                        <div className="profile-name" onClick={() => editProfile()}>
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
                        <div className="edit-btn">
                            <span onClick={() => editProfile()}>Изменить профиль</span>
                        </div>
                    </div>
                </div>
                
                {products.length > 0 &&
                <div className="profile-block">
                    <h2>{t("common:profile.product_head")}</h2>
                    <div className="block">
                    {products.map((product, i) => (
                        <div className="product-box" key={i}>
                            <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                                <a>
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
                            
                            <button className="addFav" onClick={() => addToFavorite(product.isbn_code)}>
                                {favoritesData.length > 0 && favoritesData.some(obj => obj.id === product.id) ?
                                    <Image width={100} height={100} src="data:image/png;base64,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"/>
                                :
                                    <Image width={100} height={100} src="data:image/png;base64,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" />
                                }
                            </button>
                        </div>
                    ))}
                    </div>
                </div>}
            </div>}
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const access = context.req.cookies.access ?? false
    if (!access) {
        return {
            props: {
                profile: null,
                production_count: null,
                products: null,
                favorites: null,
                access: null
            },
        }
    } 

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${access}`
        }
    }
    const response = await fetch(`${BACKEND_URL}/api/profile/${context.params.brandname}/`, access && config)
    
    const data = await response.json();
    const profile = data.profile;
    const production_count = data.production_count;
    const products = data.products;
    const favorites = data.favorites;

    return {
        props: {
            profile,
            production_count,
            products,
            favorites,
            access
        },
    }
}


export default Profile;