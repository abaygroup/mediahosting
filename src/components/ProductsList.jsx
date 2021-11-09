import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const ProductsList = ({title, url, subheader, products}) => {
    const url_name = url || ""
    return (
        <div className="products">
            <div className="head">
                <div className="left">
                    <h1>{title}</h1>
                    <small className="sub-header">{subheader}</small>
                </div>
                <div className="right">
                    <Link href={`/${url_name}`}><a>Еще</a></Link>
                </div>
            </div>
            <div className="block">
            {products.map((product, i) => (
                <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                    <a className="product-box">
                        <div className="picture" >
                            <Image width={1280} height={720} src={product.album ? product.album : "/icons/noimage.jpg"} alt={product.title} />
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
            ))}
            </div>
        </div>
    )
}

export default ProductsList;