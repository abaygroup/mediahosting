import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../hocs/layout';
import Link from 'next/link';
import Image from 'next/image';
import { BACKEND_URL } from '../../actions/types';

const CategoryDetail = ({subcategory, products}) => {
    const router = useRouter()

    return (
        <Layout
            title={`${router.query.slug} | mediahosting`}
            content="Поисковая страница mediahosting"
        >
            <div className="category-detail">
                <div className="category-content">
                    <div className="head" style={{ backgroundImage: `url(${subcategory.image})`}}>
                        <div className="backdrop">
                            <h1>{subcategory.name}</h1>
                        </div>
                    </div>

                    <div className="block">
                    {products.map((product, i) => (
                        <Link href={`/product/${encodeURIComponent(product.isbn_code)}`} key={i}>
                            <a className="product-box">
                                <div className="picture" >
                                    <img src={product.picture} alt="" />
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
            </div>
        </Layout>
    )
}


export async function getStaticPaths() {
    const res = await fetch(`${BACKEND_URL}/api/categories/`)
    const data = await res.json()
    const subcategories = data.sub_categories
  
    const paths = subcategories.map((sub) => ({
      params: { slug: sub.slug },
    }))
  
    return { paths, fallback: true }
}

export async function getStaticProps(context) {
    const response = await fetch(`${BACKEND_URL}/api/category/${context.params.slug}/`);
    const data = await response.json()
    const subcategory = data.sub_category;
    const products = data.products

    return {
      props: {
        subcategory, products
      },
    }
  }

export default CategoryDetail;