import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const Favorites = ({title, products}) => {

    return (
        <div className="products">
            <h1>{title}</h1>
            <div className="block">
            {products.map((obj, i) => (
                <Link href={`/product/${encodeURIComponent(obj.product.isbn_code)}`} key={i}>
                    <a className="product-box">
                        <div className="picture" >
                            <Image width={1280} height={720} src={obj.product.picture ? obj.product.picture : "/icons/noimage.jpg"} alt={obj.product.title} />
                        </div>
                        <div className="title">
                            <h4>{obj.product.title}</h4>
                            <small>{obj.product.body}</small>
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

export default Favorites;