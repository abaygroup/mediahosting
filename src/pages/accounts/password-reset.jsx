import React, { useEffect } from 'react';
import AccountLayout from '../../hocs/accountsLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { check_auth_status, passwordReset } from '../../actions/auth';
import Loader from '../../components/Loader';

import useTranslation from 'next-translate/useTranslation'


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string()
        .email('Электронная почта должна быть действительной')
        .required('Электронная почта требуется'),
});

const PasswordReset = () => {
    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { register, formState:{ errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(passwordReset(data.email));
        }
    };


    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    if (typeof window !== "undefined" && isAuthenticated)
        router.push("/");

    return (
        <AccountLayout title="Сброс пароля - mediahosting" content="Сброс пароля">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>{t("common:accounts.password-reset.h4")}</h4>
                <div className="form-group">
                    <label htmlFor="">{t("common:accounts.password-reset.form.email.label")}</label>
                    <input type="text" className={errors["email"] && "warning"} {...register("email")} placeholder={t("common:accounts.password-reset.form.email.placeholder")} minLength="3" maxLength="32"/>
                    {errors["email"] ? <p>{errors["email"].message}</p>: null}
                </div>
                <div className="submit">
                    <Link href="/accounts/login">
                        <a>{t("common:accounts.back")}</a>
                    </Link>
                    {loading ? <Loader />: <input type="submit" value={t("common:accounts.password-reset.form.submit")} />}
                </div>
            </form>
        </AccountLayout>
    ) 
}

export default PasswordReset;