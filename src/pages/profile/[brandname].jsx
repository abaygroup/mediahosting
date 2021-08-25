import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import { BACKEND_URL } from '../../actions/types';
import Layout from '../../hocs/layout';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Profile = ({profile, products}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const router = useRouter()

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }


    return (
        <Layout
            title={profile !== null ? profile.brandname : "Профиль"}
            content="Страница профиля"
        >   {isAuthenticated &&
            <div className="profile-container">
                <div className="head" style={{backgroundImage: `url(${profile.logotype})`}}>
                    <div className="backdrop">
                        <Image src={profile.logotype} width={512} height={512} />
                        <div className="profile-name" onClick={() => alert("hello wolrd")}>
                            <h4 className="branding">{profile.branding ? 
                                <>
                                    <Image width={100} height={100} src="https://img.icons8.com/fluent/48/000000/verified-badge.png" alt="" />
                                    <span>Подтвержденный бренд</span>
                                </>
                                : 
                                "Профиль"}
                            </h4>
                            <h1>{profile.first_name && profile.last_name ? <p>{profile.first_name} {profile.last_name}</p> : router.query.brandname}</h1>
                            <small>4 доступный продукт</small>
                        </div>
                    </div>
                </div>
                
                <div className="profile-block">
                    <h2>Продукты</h2>
                    <div className="block">
                    {products.map((product, i) => (
                        <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                            <a className="product-box">
                                <div className="picture" >
                                    <Image width={1920} height={1080} src={product.picture} alt="" />
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
    if (!context.req.cookies.access) {
        return {
            props: {
              profile: null,
              products: null
            },
          }
    } 

    const response = await fetch(`${BACKEND_URL}/api/profile/${context.params.brandname}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    })
    
    const data = await response.json()
    const profile = data.profile;
    const products = data.products;

    return {
        props: {
            profile,
            products
        },
    }
}


export default Profile;