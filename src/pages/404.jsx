import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../hocs/layout';

const PageNotFound = () => {
    return (
        <Layout
            title="404 - mediahosting"
        >
            <div className="page-not-found">
                <Image width={100} height={100} src="data:image/png;base64,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" />
                <h2>Что то пошло не так!</h2>
                <small>Произошла ошибка маршрутизации или сервера. Перейдите на <Link href="/"><a>главную</a></Link> страницу или попробуйте обновить страницу.</small>
            </div>
        </Layout>
    )
}

export default PageNotFound;