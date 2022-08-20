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
                <p style={{maxWidth: "640px", margin: "20px auto"}}>{t('common:accounts.success.h4')}</p>
            </AccountLayout>
        </React.Fragment>
    ) 
}

export default SuccessFull;