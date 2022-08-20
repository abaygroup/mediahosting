import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { check_auth_status } from '../actions/auth';
import Script from 'next/script'


const ProductLayout = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.content} />
            </Head>
            <Script>
                {`
                    localStorage.setItem('currentPage', "${router.asPath}");
                `}
            </Script>
            <div id="root">
                <div className="product-container">
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    )
}

ProductLayout.defaultProps = {
    title: "mediahosting",
    content: "lorem ipsum"
}

export default ProductLayout;