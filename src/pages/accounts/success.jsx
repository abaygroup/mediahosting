import React, { useEffect } from 'react';
import AccountLayout from './../../hocs/accountsLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { check_auth_status } from './../../actions/auth';
import useTranslation from 'next-translate/useTranslation'


const SuccessFull = () => {
    const router = useRouter()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const { t } = useTranslation();



    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    if (typeof window !== "undefined" && isAuthenticated)
        router.push("/");

    return (
        <React.Fragment>
            <AccountLayout title="Аккаунт создан - mediahosting" content="Успешно создано аккаунт">
                <div className="accounts-container">
                    <div className="head">
                        <Link href="/"><a className="back"><Image width={100} height={100} src="https://img.icons8.com/ios/100/000000/back--v1.png"/></a></Link>
                        <Link href="/"><a><Image width={5276} height={730} src="/icons/logo-black.png" /></a></Link>
                    </div>
                    <p style={{maxWidth: "640px", margin: "20px auto"}}>{t('common:accounts.success.h4')}</p>
                </div>
            </AccountLayout>
        </React.Fragment>
    ) 
}

export default SuccessFull;