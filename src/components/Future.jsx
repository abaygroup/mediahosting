import React from 'react';
import useTranslation from 'next-translate/useTranslation'


const Future = ({products}) => {
    const { t } = useTranslation();

    return (
        <div className="future">
            <h2>{t("common:main.h1")}</h2>
            <div className="block">
            {products.map((product, i) => (
                <div className="product-box" key={i}>
                    <img src={product.picture} alt="" />
                    <div className="title">
                        <h4>{product.title}</h4>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Future;