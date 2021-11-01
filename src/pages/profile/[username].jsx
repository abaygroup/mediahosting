import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BACKEND_URL } from '../../actions/types';
import Layout from '../../hocs/layout';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { EditModal } from '../../components/Modal';


const Profile = ({profile, products, favorites, production_count, access}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const router = useRouter();
    const { t } = useTranslation();
    const [favoritesData, setFavoritesData] = useState(favorites);
    const [editModal, setEditModal] = useState(false)

    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                }
            }
            const response = await fetch(`${BACKEND_URL}/api/profile/${router.query.username}/`, access && config);
            const data = await response.json()
            if (!cleanupFunction) {
                setFavoritesData(data.favorites)
            }
        }

        fetchData();
        return () => cleanupFunction = true; 
    }, []);

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    const editProfile = () => {
        setEditModal(prev => !prev);
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
            title={profile !== null && `${profile.user.username} - Профиль`}
            content="Страница профиля"
            header={profile !== null && profile.user.profile_name}
        >   
            {isAuthenticated &&
            <>
                <EditModal data={profile} showModal={editModal} setShowModal={setEditModal} />
                <div className="profile-container">
                    <div className="head" style={{backgroundImage: `url(${profile.avatar})`}}>
                        <div className="backdrop">
                            <div className="avatar">
                                <div className="edit-avatar" onClick={() => user !== null && user.username === profile.user.username && editProfile()}>
                                    {/* <Image width={192} height={192} src="data:image/png;base64,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" /> */}
                                    {/* <Image width={192} height={192} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAABmJLR0QA/wD/AP+gvaeTAAAFCElEQVR4nO3dMYpkVRSH8VeTioHQDeIOXIAbEBxmBYbChC5ATRTbaBA3MNEMmhi5AXNDxTHQQDAwMhARBDXqz6Cmxje043TVu+fd+/r//RZQ93D5Tld312t6miRJkiRJkiRJkiRJkiRJkiRJkhQDeAW4B3wL/A78DfwMfA680Xs+qQxwF/iD//cF8GLvWaWmgA+eE/7cN8B575mlJoCLI+I/+B54uffs0iInxu8SaPsWxu8SaLsaxe8SaHsax+8SaDuK4ncJNL7i+F0CjWul+F0CjWfl+F0CjaNT/C6B+usc/4FLoPUxRvwHLoHWw1jxH7gEqseY8R+4BKrD2PEflC/BrvLFNSbg02ma3uo9xzX9ME3T67vd7peKF79V8aIaF/Bwqon/u2maPil43VenafoS/6hGSwEPi75VeQScPT7jvaIz/JlAp2OF+GdnuQQaByvGPzvTJVB/wIOiEJ8Z/+zsqt80fQ28sNYdaqPoGP9shqol+Kz6/rRhDBD/bJaKJbgEXqu6P20YA8U/m6niZ4L7re9OG8eA8c9ma/1O8GOre9MNwMDxz2b8uOFcfy6dx0+Cbwjg3jRNd4te/sFut/t16Yuw/zT3ToN5DhYvgG4A6h9suwTeXjjjGft3kpa+anWH2ijWe6rz5CWgJn6Ad1vfpzaE9R9pPnoJgHNq4v8NeKnqbjU4+j3Pf+0loO4r/yXwZvUda1D0/2OW5y4BdfEDvL/WXWsw9I//4JlLQN23PQAfrn3nGgTjxH9wZQkwflVgvPgPniwBxq8KjBv/wSXwDsav1hg//mrGn4q6+H9i/z99R2f8qaiL/xH7X1HeBv4qOqMF409Fcfyzc0ZdAuNPxUrxz84bbQmMPxUrxz87d5QlMP5UdIp/dv4d+i6B8aeic/yzOXq9Exh/KgaJfzbP2ktg/KkYLP7ZXGstgfGnYtD4Z/PdpvbDMuNPxeDxP57xnP0nxhWMPxXbid8H29QWxm/8qTB+40+F8Rt/Kozf+FNh/MafCuM3/lQYv/GnwviNPxXGb/ypMH7jT4XxG38qjN/4U2H8xp8K4zf+VBi/8afC+I0/FcZv/KkwfuNPhfEbfyqM3/hTYfzGnwrjN/5UGL/xp8L4jT8Vxm/8qTB+40+F8Rt/Kozf+FNh/MafCuM3/lQYv/GnwviNPxXGb/ypMH7jT4XxG38qjN/4U2H8xp8K4zf+VBi/8afC+I0/FcZv/KkwfuNPhfEbfyqM3/hTYfzGnwrjN/5UGL/xp8L4jT8Vxm/8qTB+40+F8Rt/Kozf+FNh/MafCuM3/lQYv/GnwviNPxXGb/ypMH7jT4XxG38qjN/4U2H8xp8K4zf+VBi/8afC+I0/FcZv/KkwfuNPhfEbfyqM3/iTFUVl/NqGgqiMX9vROCrj17Y0jMr4tT2NojJ+bVODqIxf29UgrFbxn1EX/0WLGXUDLS2r0Qx+5VcfS+tqcL7xq5+lhS082/jV19LKFpxr/OpvaWknnmn8GsPS2k44z/g1jqXFHXmW8WssS6s74hzj13iWlnfNM4xfJ9lVH3DdiAd1sdvtPuo9hOrc6j3AwIw/gAvw34w/hAtwlfEHcQGeZvxhXIB/GX8gF2DP+EO5AMYfLX0BjD9c8gIYv2IXwPg1TVPmAhi/nkhbAOPXU5IWwPh1RcoCGL/6KHpG/xg+zy9JkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkrQB/wC0P+DJhTVyEgAAAABJRU5ErkJggg==" /> */}
                                    <Image width={96} height={96} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAHHUlEQVR4nO3cXcwcVR3H8f/S8mpLggjWqhgRaQqGyIvyIiYg0lIxaKlcmOiFN8YYULQYq95oAE1IVEJigKBRolASRXxBQoyxVUS0pjVaa/RCEiQWxWJ9aUspT/vx4uwDzZM9O7P7zM7s7jPfZC/6dGfO7/87s2f+5z/nTERLS0tLS0tLS0tLS0tLrXSaFoCjI+LCiLg0Is6KiBURsSwilkTETEQ8ExG7ImJHRPw6Ih6LiG2dTudQI4KnBZyNO7Db4DyJL+G8puOYOHAWfoRDQxjfi1/gahzRdGxjDY7BF/F8RcbP5Y94d9NxjiU4Db8dkfFzeVQ7NL0IzsU/ajJ/loO4E8c3HX+j4Dz8p4RhM9iE63E+TsaReAlOxzX4inTzHYQn8bamfWgEadh5usCgPbgJJ5Y85xG4DPd1O60MB3ELjhp1zGODdMMtGvPvwSvm0capuF35m/o2rKwyzrFFynZyzGB9hW2txEMlO2EfPlhV22OJlOfnrsoZrB1Ru6uxo2RH3CXNwKcPaZKVo7IrP9P2YqzHsyU64TEsH6We2pHKC7kZ7j016jhTuXnHTlxUl66RI+XevdiHV9WsZTE+qzhbeg7vrVPbSMDR8oW1mxrUdTH+VtAJB/GxpjRWAi7JBPe8knn+CLUtx68KOoFUYZ3Moh4+lwlqU9PaIl6Ym3yjRCfcjUVN6x0YfC8T0PVNazscfFzxfWEjFjetdSCkcnAvzm9a21ykOcOegk74rkkqX2BXJpCTmtbWC1yEfxd0wvcnphOkdK4XYxuANG8pKhg+ZISz5irv+JP4kLxM/JNxL8BTEzYEXYL/Flz9m3Bs01pLIX8TvqBpbXPBWsX1op9gSdNaS4PvZAIZmxkmOvikNPPtxw9wTNN6BwKfyQSzuWltERFY0uciOZxvmrQ5QERhKeJlDWt7HbaXMP9mNL5acCiwSD6la7IYdyWeKTD+AD7QlMbKkC9H71Xzww9pyLlT8Qq83bisTm0jQ3oQkgv43hp1XIy/FBhPytxW1KWrFqTpe44bRtz2cdISlDJLVu7H0gHOvQpfxZ+lOtIe/El6vnz5KOMaCLxBGlN7MYOrR9BmB+9TbuHWDD6l5M1WWhj2aInzPoLTq45tKPCFAgM+UWFbb8GWEgbB3w1wteJyxQW7w9mNS6uKbWhwrLQQqh/34ZXzaOMcKa8vu8z9hzh5gPNfodzqil6d0PwvAa9RXGnci88rWS+Snjuvk8oEZdmHDxsgvze8+bP8fHjnKgRvVm4HzAx+Jq3puRAvx1FSKrkS78fXFefzc9mKMwbUPF/zZxmP1FZanp57WDMq9uIGA5YUFJv/HDZIq7dPwke6bfXijlF5OjDSQtqtldnbn2/jtUNoLGP+VT2O+1Dm+zuqca8ipEeARfX3+bJhSG1Dmd89dqne1dXd83OsIvBGPFy51Xl+bIBnEOZhfvf4E/TOxJrtgK6wuxTX3kfBIXxNQRXWPM3vnmND5tjmhiCsUbwcsA7+iSszGqsw/yr5xQi3j8bd/oIWSVuOBtkDvFPaLXOdVG85Tfr1HCmloidghdSp6/EA/jXA+Q9JG0YWH6Zz1OZT94xYKoTlVsfN5WncinOHbGt2r9jd8mngXB6UNv3VYX69TwFxvHIFqydwrQpXGkg5+c3KZVjbazB/N15fVXyFSFfVIwWB78eNVRrfQ8dy3FuiE0Zp/rN4+6hi7CVokbSCoB87cGaNmtYavGRRlflX1BXnrKhbCgLbiONqFZV0nYLfTbv579A/27lNg5sdpPvSb6bV/BP1f//DbbUK6q2xjmynfvO7wvrtNNmo4W0+027+BfJDzx80MObP0Te95nfFbcqI2q/GbCejberNf2sfYTc2IupFbdNtflfg/RlhT2hwHf1CMX+Z/IKnaxvUNf3md0V+NCPuaQ1d/QvG/K7QzRmBtzakZ0GZv7SP0HMa0LNwzI94YWNzL3Y2oGVhmR8RgU9nhH6rZh2rSpj/roJzrJHmLP3O8c66YiqFVF7oxXU1alh4V/4s+GVG8Kqa2l+9YM2PiMBfM6JPran93AUw/eZHRMi//falNbS9SP7B+3SO+XOR3/Ey8hdx4IxM2wdM+5U/DkhL03vx04LjJuLKn4T3o52d+fuW3AFYExEPRETuNTMHImJdp9N5cJ7aph/5Esi6zPcn4sqfCKTdj7lNcq/u8f3W/CqR1on24qnu/5+C90jLYzbLJwuM6Q133N8Kkhv/l3Q7YVnJ8+yPiLWdTufhamRVx7h3QG7x7pLupwwHIuKacTQ/YvyzoNwvoCxttjMfpA0WwzKWY/7EIO2sHIa9Uu1oddMxlGGc7wFl3rj7v4j4fURs7X52RMT2TqdzYJTCqmScO+BNc/69KyK2zfk83ul01C2sSsa5AzoR8eVIJYctnU7n8Yb1tLS0tLS0tLS0tLS0VML/AZbIHaDWPhmAAAAAAElFTkSuQmCC" />
                                </div>
                                <Image src={profile.avatar ? profile.avatar : "/icons/avatar.jpg"} width={512} height={512} />
                            </div>
                            <div className="profile-name">
                                <h4 className="branding">{profile.branding ? 
                                    <>
                                        <Image width={100} height={100} src="https://img.icons8.com/fluent/48/000000/verified-badge.png" alt="" />
                                        <span>{t("common:profile.branding")}</span>
                                    </>
                                    : 
                                    <span>Профиль</span>}
                                </h4>
                                <h1 onClick={() => user !== null && user.username === profile.user.username && editProfile()}>{profile.user.profile_name ? <p>{profile.user.profile_name}</p> : router.query.username}</h1>
                                <small>{production_count} {t("common:profile.production_count")}</small>
                            </div>
                            {user !== null && user.username === profile.user.username &&
                            <div className="edit-btn">
                                <span onClick={() => editProfile()}>{t("common:profile.edit_profile")}</span>
                            </div>
                            }
                        </div>
                    </div>
                    
                    {products.length > 0 &&
                    <div className="profile-block">
                        <div className="product-head">
                            <div className="left">
                                <h2>{t("common:profile.product_head")}</h2>
                                <small className="sub-head">{t("common:profile.sub_header")}</small>
                            </div>
                            <div className="right">
                                <Link href="/"><a>{t("common:profile.edit_btn")}</a></Link>
                            </div>
                        </div>
   
                        <div className="block">
                        {products.map((product, i) => (
                            <div className="product-box" key={i}>
                                <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                                    <a>
                                        <div className="picture" >
                                            <Image width={1920} height={1080} src={product.album ? product.album : "/icons/noimage.jpg"} alt="" />
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
                </div>
            </>}
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
    const response = await fetch(`${BACKEND_URL}/api/profile/${context.params.username}/`, access && config)
    
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