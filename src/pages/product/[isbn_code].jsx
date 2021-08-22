import ProductLayout from "../../hocs/productLayout";
import { useRouter } from 'next/router';

const ProductDetail = () => {
    const router = useRouter();

    return (
        <ProductLayout
            title={router.query.isbn_code}
            content="Product detail page"
        >
            <div className="product-detail">
                <h1>{router.query.isbn_code}</h1>
            </div>
        </ProductLayout>
    )
}

export default ProductDetail;