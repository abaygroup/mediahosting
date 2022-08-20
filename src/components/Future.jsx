import React from 'react';
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link';
import Image from 'next/image';


import { AiOutlineFieldTime } from 'react-icons/ai'; 

const Future = ({products}) => {
    const { t } = useTranslation();

    return (
        <div className="future">
            <div className="head">
                <h1>{t("common:main.h1")}</h1>
                <small className="sub-header">{t("common:main.sub1")}</small>
            </div>
            <div className="block">
            {products.map((product, i) => (
                <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                    <a className="product-box">
                        <Image width={1280} height={720} src={product.album ? product.album : "/icons/noimage.jpg"} alt={product.title} />
                        <div className="title">
                            <h4>{product.title}</h4>
                        </div>
                        <div className="goto">
                            <AiOutlineFieldTime />
                        </div>
                    </a>
                </Link>
                
            ))}
            </div>
        </div>
    )
}

export default Future;