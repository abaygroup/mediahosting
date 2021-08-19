import React from 'react';
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link';


const LastProducts = ({products}) => {
    const { t } = useTranslation();

    return (
        <div className="products">
            <h1>{t("common:main.h3")}</h1>
            <div className="block">
            {products.map((product, i) => (
                <Link href={"/"} key={i}>
                    <a className="product-box">
                        <div className="picture" >
                            <img src={product.picture} alt="" />
                        </div>
                        <div className="title">
                            <h4>{product.title}</h4>
                            <small>{product.body}</small>
                        </div>
                        <div className="goto">
                            <img src="https://img.icons8.com/color/96/000000/circled-play--v1.png"/>
                        </div>
                    </a>
                </Link>

            ))}
            </div>
        </div>
    )
}

export default LastProducts;