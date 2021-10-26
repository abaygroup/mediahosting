import React, { useEffect, useState } from 'react';
import AccountLayout from '../../../../hocs/accountsLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { activation, check_auth_status } from '../../../../actions/auth';
import Loader from '../../../../components/Loader';
import useTranslation from 'next-translate/useTranslation'


const Activate = () => {
    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [verified, setVerified] = useState(false);

    const verify = (e) => {
        e.preventDefault();
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(activation(router.query.uid, router.query.token));
        }
        setVerified(true);
    }

    if (verified) {
        router.push("/accounts/login")
    }

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    if (typeof window !== "undefined" && isAuthenticated)
        router.push("/");

    return (
        <React.Fragment>
            <AccountLayout title="Активация - mediahosting" content="Активация аккаунта">
            <div className="accounts-container">
                <div className="head">
                    <Link href="/"><a className="back"><Image width={100} height={100} src="https://img.icons8.com/ios/100/000000/back--v1.png"/></a></Link>
                    <Link href="/"><a><Image width={5276} height={730} src="/icons/logo-black.png" /></a></Link>
                </div>
                <form onClick={e => verify(e)}>
                    <h4>{t("common:accounts.activate.h4")}</h4>
                    <div className="submit" style={{display: "block", textAlign: "center"}}>
                        {loading ? <Loader />: <input type="submit" value={t("common:accounts.activate.form.submit")} />}
                    </div>
                </form>
            </div>
            </AccountLayout>
        </React.Fragment>
    ) 
}

export default Activate;