import Layout from "../../hocs/layout";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BACKEND_URL } from "../../actions/types";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AlbumModal, Modal } from "../../components/Modal";
import useTranslation from "next-translate/useTranslation";
import { setAlert } from '../../actions/alert';



const ProductDetail = ({product, chapters, videohosting, favorites, features, followings, published_count, private_count, access}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const router = useRouter();
    const [productModal, setProductModal] = useState(false);
    const [albumModal, setAlbumModal] = useState(false)

    const { t } = useTranslation();
    const [favoritesList, setFavoritesData] = useState(favorites);
    const [followingsList, setFollowingsData] = useState(followings)


    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                }
            }
            const response = await fetch(`${BACKEND_URL}/api/product/${router.query.isbn_code}/`, access && config);
            const data = await response.json()
            if (!cleanupFunction) {
                setFavoritesData(data.favorites);
                setFollowingsData(data.followings);
            }
        }

        access && fetchData();
        return () => cleanupFunction = true; 
    }, [])


    const modalHandler = () => {
        setProductModal(prev => !prev);
    }

    const albumHandler = () => {
        setAlbumModal(prev => !prev)
    }


    // Add To Favorite Handle
    // ==================================================================
    const addToFavorite = async (isbn_code) => {
        try {
            await fetch(`${BACKEND_URL}/api/favorites/${isbn_code}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                }
            })

            if(favoritesList.length > 0 && favoritesList.some(obj => obj.id === product.id)) {
                document.querySelector('.favorite').innerHTML = `<Image width={100} height={100} src="data:image/png;base64,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" />`;
                if (dispatch && dispatch !== null && dispatch !== undefined) {
                    dispatch(setAlert("Вы отменили лайк", "success"));
                }
            } else {
                document.querySelector('.favorite').innerHTML = `<Image width={100} height={100} src="data:image/png;base64,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"/>`;
                if (dispatch && dispatch !== null && dispatch !== undefined) {
                    dispatch(setAlert("Добавлено в понравившиеся.", "success"));
                }
            }
            
        } catch(e) {
            console.log(e);
        }
    }

    // Follow Handle
    // ==================================================================
    const FollowHandler = async (isbn_code) => {
        try {
            await fetch(`${BACKEND_URL}/api/follow/${isbn_code}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                }
            })
            if(followingsList.length > 0 && followingsList.some(obj => obj.id === product.id)) {
                document.querySelector(".follow").innerHTML = `<Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAA3ElEQVR4nO3bMQ7DIBAAQcj//0zaxK2xvJZnOjrQiu5uDAAAAAAAAOC95t0XOGuttX7Pc85Hv+lz9wX4J0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSs21S/DiF/ja7pu79kBhBYgSJefS20Rg2qLiYIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSIwgAAAAAAABAxhdm+gx+sldCogAAAABJRU5ErkJggg==" />`;
                if (dispatch && dispatch !== null && dispatch !== undefined) {
                    dispatch(setAlert("Вы отменили подписку", "success"));
                }
            } else {
                document.querySelector(".follow").innerHTML = `<Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAEW0lEQVR4nO3da6jfcxwH8N2Yy2xzWUwma7RoLSUP8AAt0VBDSCQPRlIuDzBPaB64JMlKNkUsWYzxxFKWWy7lEptiLmvuIyJjspmdlwffc3J8/1822/+cz87/+309XP/z+73PeZ/9+l2+n98ZNappmqZpmqZpmqZpmqZpmqZpmqZpmpEL07AUKzA7Ok/VsCfW+Nv66ExVwy3+aQvGReeqEo7B5qyQJdG5qoQxeC0rYwP2j85WJVyj0znRuaqEw/FLVsby6FzVwnNZGT/j0OhcVcKlhUPVZdG5qoSD8H1WxosYHZ2tSng8K+M3zIjOVSXMLRyqrovOVSVMxJdZGW9ibHS2KmFxVsZWHBudq0o4AduyQm6NzlUljMeHWRlrsVd0tirh9qyMbTgpOleVMBt/ZIUsis5VJYzDO1kZX2C/6GxVwo2Fa46zo3NVCdOxKStjaXSuKmE0VmVl/IAp0dmqhMsLh6oLo3NVCVPxU1bGyuhc1cLTWRkbMS06V5VwfuFQdWV0riphEr7JynhFe+gUAw9nZWzG0dG5qoRT0ZcVclN0riphH6zLyliDPaKzVQn3ZGVsxXHRuaqE4/FnVsid0bmqJN3JfTcr4xPsHZ2tSrg5K6MPc6JzVQkz8XtWyAPRuaokjQ+8mpXRxgei4Gqd5kXnqpLy+MAT0bl2Wv83tADnRmfZGViZlfEjDo7OtVMwof9YO+A+jInOtaNwSeFQNXLHB6SVe7knMT462/ZgivQIdrDnjeQ7udgXXxVKeQmTovP9FzyWZd6E6dG5dhmOwEeFUlZjanS+EpxZyNs74wM4AK8XvsnPMDM632BqGR/oP3zlZyyks5YTo/MNwP1Zvi2YFZ1rSEg35x4slLIJc3eDfKXxgYXRuYaUtKBsYaGUrZgfmGs8PsgyrTUCzgi7AtcWfhv7on4jcVuWpb7xAVysc9k+LDKMF5DK4wP3Dtf+dyuYo/NeETxlGKaNMBZvZ/v+HBOGet+7LemxaD5UDy9g4hDv+/rCfk8fyn2OCJihcyUHvG+I3gUiXbTm4wOPDMW+RiRp0fJ7hVLW46gu72u0dG9qsDY+kMNkaTlm7jtdXGqD+YV9XNCt7fcU6ZpgeeEH9ivO6ML2D9E5PvBsN7L3LOnsJ38LAulWxkW7uO0V2TY34rBuZe9p0tPGXB9u2MntnVfY3hXdzt3TcJXOq3r+5wWkND7wdbaNl43kh05RME/nuih41A4ucsZD2de28YFdgVOkdxTmVtnOYH7/1+bjAwuGK3vPwqzCYQfe8i/XENL4wKfZ51fv6P+sZjukK+yPC6Wsw5GFz9+dfa6ND3QbDsQbhVK+NegFYcrjA3dEZu9Z0mPh/D24pAvI07TxgeEn/cmHZYVSNuOZ7N/6cHJ05p4n3Si8q1BKbnF01qpIj4XzU9sBGzA5OmN1pNd5lx4Lt/GBKDhLenP0gGXRmaonLVxYIi05am8CbZqmaZqmaZqmaZqmaZqmGewvmPJrQ7ErY0gAAAAASUVORK5CYII=" />`;
                if (dispatch && dispatch !== null && dispatch !== undefined) {
                    dispatch(setAlert("Вы подписали", "success"));
                }
            }
        } catch(e) {
            console.log(e);
        }
    }


    return (
        <Layout
            title={product.title}
            content="Страница релизов"
            header={product.title}
        >
            <Modal about={product.about} features={features} body={product.body} showModal={productModal} setShowModal={setProductModal} />
            <AlbumModal album={product.album} albumModal={albumModal} setAlbumModal={setAlbumModal} />
            <div className="product-container">
                <div className="head" style={{backgroundImage: `url(${product.album})`}}>
                    <div className="backdrop">
                        <Image onClick={albumHandler} src={product.album ? product.album : '/icons/noimage.jpg'} width={1280} height={720} />
                        <div className="product-name">
                            <h4 className="production"> 
                                <Image width={100} height={100} src="https://img.icons8.com/fluent/48/000000/verified-badge.png" alt="" />
                                <span>{t("common:product.production")}</span>
                            </h4>
                            <h1 onClick={modalHandler}>{product.title}</h1>
                            <small>{published_count} {t("common:product.published_count")} | {private_count} {t("common:product.private_count")}</small>
                            <div className="owner">
                                <Link href={`/profile/${product.owner.username}`}>
                                    <a>{product.owner.profile_name}</a>
                                </Link>
                                |
                                <Link href={`/search/${product.subcategory.slug}`}>
                                    <a>{product.subcategory.name}</a>
                                </Link>
                            </div>
                        </div>
                        {isAuthenticated ?
                            <div className="handlers">
                                <div onClick={() => addToFavorite(product.isbn_code)} className="favorite" title="Добавить">
                                    {favoritesList.length > 0 && favoritesList.some(obj => obj.id === product.id) ?
                                        <Image width={100} height={100} src="data:image/png;base64,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"/>
                                    :
                                        <Image width={100} height={100} src="data:image/png;base64,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" />
                                    }
                                </div>
                                <div onClick={() => FollowHandler(product.isbn_code)} className="follow" title="Подписаться">
                                    {followingsList.length > 0 && followingsList.some(obj => obj.id === product.id) ?
                                        <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAEW0lEQVR4nO3da6jfcxwH8N2Yy2xzWUwma7RoLSUP8AAt0VBDSCQPRlIuDzBPaB64JMlKNkUsWYzxxFKWWy7lEptiLmvuIyJjspmdlwffc3J8/1822/+cz87/+309XP/z+73PeZ/9+l2+n98ZNappmqZpmqZpmqZpmqZpmqZpmqZpmpEL07AUKzA7Ok/VsCfW+Nv66ExVwy3+aQvGReeqEo7B5qyQJdG5qoQxeC0rYwP2j85WJVyj0znRuaqEw/FLVsby6FzVwnNZGT/j0OhcVcKlhUPVZdG5qoSD8H1WxosYHZ2tSng8K+M3zIjOVSXMLRyqrovOVSVMxJdZGW9ibHS2KmFxVsZWHBudq0o4AduyQm6NzlUljMeHWRlrsVd0tirh9qyMbTgpOleVMBt/ZIUsis5VJYzDO1kZX2C/6GxVwo2Fa46zo3NVCdOxKStjaXSuKmE0VmVl/IAp0dmqhMsLh6oLo3NVCVPxU1bGyuhc1cLTWRkbMS06V5VwfuFQdWV0riphEr7JynhFe+gUAw9nZWzG0dG5qoRT0ZcVclN0riphH6zLyliDPaKzVQn3ZGVsxXHRuaqE4/FnVsid0bmqJN3JfTcr4xPsHZ2tSrg5K6MPc6JzVQkz8XtWyAPRuaokjQ+8mpXRxgei4Gqd5kXnqpLy+MAT0bl2Wv83tADnRmfZGViZlfEjDo7OtVMwof9YO+A+jInOtaNwSeFQNXLHB6SVe7knMT462/ZgivQIdrDnjeQ7udgXXxVKeQmTovP9FzyWZd6E6dG5dhmOwEeFUlZjanS+EpxZyNs74wM4AK8XvsnPMDM632BqGR/oP3zlZyyks5YTo/MNwP1Zvi2YFZ1rSEg35x4slLIJc3eDfKXxgYXRuYaUtKBsYaGUrZgfmGs8PsgyrTUCzgi7AtcWfhv7on4jcVuWpb7xAVysc9k+LDKMF5DK4wP3Dtf+dyuYo/NeETxlGKaNMBZvZ/v+HBOGet+7LemxaD5UDy9g4hDv+/rCfk8fyn2OCJihcyUHvG+I3gUiXbTm4wOPDMW+RiRp0fJ7hVLW46gu72u0dG9qsDY+kMNkaTlm7jtdXGqD+YV9XNCt7fcU6ZpgeeEH9ivO6ML2D9E5PvBsN7L3LOnsJ38LAulWxkW7uO0V2TY34rBuZe9p0tPGXB9u2MntnVfY3hXdzt3TcJXOq3r+5wWkND7wdbaNl43kh05RME/nuih41A4ucsZD2de28YFdgVOkdxTmVtnOYH7/1+bjAwuGK3vPwqzCYQfe8i/XENL4wKfZ51fv6P+sZjukK+yPC6Wsw5GFz9+dfa6ND3QbDsQbhVK+NegFYcrjA3dEZu9Z0mPh/D24pAvI07TxgeEn/cmHZYVSNuOZ7N/6cHJ05p4n3Si8q1BKbnF01qpIj4XzU9sBGzA5OmN1pNd5lx4Lt/GBKDhLenP0gGXRmaonLVxYIi05am8CbZqmaZqmaZqmaZqmaZqmGewvmPJrQ7ErY0gAAAAASUVORK5CYII=" />
                                    :
                                        <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAA3ElEQVR4nO3bMQ7DIBAAQcj//0zaxK2xvJZnOjrQiu5uDAAAAAAAAOC95t0XOGuttX7Pc85Hv+lz9wX4J0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSs21S/DiF/ja7pu79kBhBYgSJefS20Rg2qLiYIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSIwgAAAAAAABAxhdm+gx+sldCogAAAABJRU5ErkJggg==" />
                                    }
                                </div>
                            </div> :
                            <div className="handlers">
                                <Link href="/accounts/login" title="Добавить">
                                    <a className="favorite">
                                        <Image width={100} height={100} src="data:image/png;base64,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" />
                                    </a>
                                </Link>
                                <Link href="/accounts/login" title="Подписаться">
                                    <a className="follow">
                                        <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAA3ElEQVR4nO3bMQ7DIBAAQcj//0zaxK2xvJZnOjrQiu5uDAAAAAAAAOC95t0XOGuttX7Pc85Hv+lz9wX4J0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSs21S/DiF/ja7pu79kBhBYgSJefS20Rg2qLiYIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSIwgAAAAAAABAxhdm+gx+sldCogAAAABJRU5ErkJggg==" />
                                    </a>
                                </Link>
                            </div>
                        }

                    </div>
                </div>
                {product.production ?
                <div className="product-block">
                    <div className="subtitles">
                        <small>{t("common:product.subtitle.one")}</small>
                        <small>{t("common:product.subtitle.two")}</small>
                        <small>{t("common:product.subtitle.three")}</small>
                    </div>
                    <div className="block">
                        {chapters.map((chapter, i) => (
                            <div className="chapter" key={i}>
                                <h4>{chapter.name}</h4>
                                {videohosting.map((video, i) => {
                                    const date = new Date(Date.parse(video.timestamp))
                                    if (video.chapter === chapter.id) {
                                        return (
                                            <React.Fragment key={i}>
                                                {video.access ?
                                                    <Link href={`/product/${encodeURIComponent(product.isbn_code)}/videohosting/${encodeURIComponent(video.id)}`}>
                                                        <a className="product-item">
                                                            <div className="picture">
                                                                <Image width={1920} height={1080} src={product.album ? product.album : "/icons/noimage.jpg"} alt="" />
                                                                <div className="body-comments">
                                                                    <Image width={100} height={100} src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris-1.png"/>
                                                                    <small>{t("common:product.product-item.open")}</small>
                                                                </div>
                                                            </div>
                                                            <div className="title">
                                                                <span>{video.title}</span>
                                                            </div>
                                                            <div className="timestamp">
                                                                <small>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</small>
                                                            </div>
                                                            <div className="access">
                                                                <Image width={100} height={100} src="https://img.icons8.com/ios/50/000000/play--v1.png"/>
                                                            </div>
                                                        </a>
                                                    </Link>
                                                    :
                                                    <div className="product-item">
                                                        <div className="picture">
                                                            <Image width={1920} height={1080} src={product.album} alt="" />
                                                            <div className="body-comments">
                                                                <Image width={100} height={100} src="https://img.icons8.com/ios/50/000000/lock--v1.png"/>
                                                                <small>{t("common:product.product-item.close")}</small>
                                                            </div>
                                                        </div>
                                                        <div className="title">
                                                            <span>{video.title}</span>
                                                        </div>
                                                        <div className="timestamp">
                                                            <small>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</small>
                                                        </div>
                                                        <div className="access">
                                                            <Image width={100} height={100} src="https://img.icons8.com/ios/50/000000/lock--v1.png"/>
                                                        </div>
                                                    </div>
                                                }
                                            </React.Fragment>
                                        )
                                    }
                                })}
                            </div>
                        ))}
                    </div>
                </div> : 
                <div className="empty-container">
                    <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAADRUlEQVR4nO3cP2hTURTH8XNeIjgYkS4WaUEQdBGhzU0sDk6OOjnbzSyClpZuanVwVxCkbv5bHK3goBAU0Zp3bwMiiGLp0Ai6iBC30BwHDUjaJjZ5L/e8l99nTEPvSb689l7yCBEAAAAAAAAA6MFxL2CtnSOiq0S0N+61YrYmIhcKhcKzOBeJNUilUhkNgqBGRJk41xmgr8aYsTgXCOL85QNcIzVifbOKxeI3Zp4lop9xrjMgayJy3vcQAAAA2+l525ui80XU+jqv9BQkheeLqPV8Xuln24vzRQx6elNTdr6IGs4rAADgxaZtbxiGZ5n5LhGNeJhnmNREpNR+Xtm0y2Lm24QYgzDGzIvtD2617R0dwDDwx3j7AzjcKZPt9gRjTOyfuw8Ta610+jmuEGUQRBkEUQZBlEEQZRBEGQRRBkGUQRBlEEQZBFEGQZRBEGUQRBkEUUZ9kDAMbzjnSiKiftYoqH+RzHxARBadc5WVlZWTvueJm/og/8g3m82X1tola+0h38PEJUlBWk4T0Udr7a1qtbrP9zBRS2IQIqJdRHRxY2Nj1Vp7qVwud703ICmSGqRlhIhu5nK5D865M76HiULSg7QcEZEnzrnnzrljvofpR1qCEBGRiJwSkapz7v7y8vJ+3/P0IlVB/gpE5Fw2m/0ShuG1crm82/dAO5HGIC17mHkhl8t9DsNwWkQSccNfmoO0jDPzPefc20qlcsL3MN0MQ5CW40EQvLbWPq5Wqwd9D7OdYQqSCKk5UP2Hd81mc7ZYLL7xPUgnwxBkXUQuG2MeMHPHO881SPOfrF8icr1erx8uFAr3kxCDKJ1XSJOZHzUajfmpqanvvofZqVQFYeYXRDSXz+ff+56lV2kJ8omZ5/P5/JLvQfqV9P8hP4hopl6vH01DDKLkXiENIrqTyWQWJiYmUvUFOEkM8pSIZowxq74HiUOSgrggCGYnJydf+R4kTkkIUhORaWPMw6ScJfqhPogx5orvGQYp6bus1EEQZRBEGQRRBkGUQRBlEEQZBFEGQZRBEGUQRBkEUQZBlEEQZRBEma6fh3T7nlmIFq4QZbYKUhv4FMNrvf2BTUFEpLTVEyFy68xc8j0EAAAAAAAAAHTyG0W44DW8gFaZAAAAAElFTkSuQmCC" />
                    <small className="empty">{t("common:product.empty")}</small>
                </div>}
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const access = context.req.cookies.access ?? false;

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    }

    const response = await fetch(`${BACKEND_URL}/api/product/${context.params.isbn_code}`, context.req.cookies.access && config)
    
    const data = await response.json();
    const product = data.product;
    const chapters = data.chapters;
    const videohosting = data.videohosting;
    const favorites = data.favorites || [];
    const followings = data.followings || [];
    const features = data.features;
    const published_count = data.published_count;
    const private_count = data.private_count;

    return {
        props: {
            product,
            chapters,
            videohosting,
            favorites,
            features,
            followings,
            access,
            published_count,
            private_count
        },
    }
}

export default ProductDetail;