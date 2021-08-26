import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const ProductsList = ({title, products}) => {

    return (
        <div className="products">
            <h1>{title}</h1>
            <div className="block">
            {products.map((product, i) => (
                <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                    <a className="product-box">
                        <div className="picture" >
                            <Image width={1280} height={720} src={product.picture} alt={product.title} />
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
    )
}

export default ProductsList;