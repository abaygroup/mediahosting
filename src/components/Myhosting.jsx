import React from 'react';
import useTranslation from 'next-translate/useTranslation'


const MyVideoHosting = ({products}) => {
    const { t } = useTranslation();

    return (
        <div className="products">
            <h2>{t("common:main.h2")}</h2>
            <div className="block">
            {products.map((product, i) => (
                <div className="product-box" key={i}>
                    <div className="picture" >
                        <img src={product.picture} alt="" />
                    </div>
                    <div className="title">
                        <h4>{product.title}</h4>
                        <small>{product.body}</small>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default MyVideoHosting;