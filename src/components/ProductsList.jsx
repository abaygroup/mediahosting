import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { AiFillPlayCircle } from 'react-icons/ai';


const ProductsList = ({title, url, subheader, products}) => {
    const { t } = useTranslation();
    const url_name = url || "";

    return (
        <div className="products">
            <div className="head">
                <div className="left">
                    <h1>{title}</h1>
                    <small className="sub-header">{subheader}</small>
                </div>
                <div className="right">
                    <Link href={`/${url_name}`}><a>{t("common:main.more")}</a></Link>
                </div>
            </div>
            <div className="block">
            {products.map((product, i) => (
                <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                    <a className="product-box">
                        <div className="picture" >
                            <Image width={1920} height={1080} src={product.album ? product.album : "/icons/noimage.jpg"} alt={product.title} />
                        </div>
                        <div className="title">
                            <h4>{product.title}</h4>
                            <small>
                                {product.authors.length > 0 && product.authors.map(item => (
                                <React.Fragment key={item.id}>{item.profile_name + ", "}</React.Fragment>))}
                            </small>
                            <small className="counts">{product.observers.length} {t("common:main.product-d.person")} {product.favorites.length} {t("common:main.product-d.likes")}</small>
                        </div>
                        <div className="goto">
                            <AiFillPlayCircle />
                        </div>
                    </a>
                </Link>
            ))}
            </div>
        </div>
    )
}

export default ProductsList;