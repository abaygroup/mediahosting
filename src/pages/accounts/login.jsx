import React, { useEffect } from 'react';
import AccountLayout from '../../hocs/accountsLayout';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { check_auth_status, login } from '../../actions/auth';
import Loader from '../../components/Loader';

import useTranslation from 'next-translate/useTranslation'


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string()
        .email('Электронная почта должна быть действительной')
        .required('Электронная почта требуется'),
    password: yup.string()
        .required('Необходим пароль')
        .min(6, 'Пароль должен состоять из 6 или более символов'),
});

const Login = () => {
    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { register, formState:{ errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(login(data.email, data.password));
        }
    };


    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    if (typeof window !== "undefined" && isAuthenticated)
        router.push(localStorage.getItem("currentPage"));

    return (
        <AccountLayout title="Авторизация - mediahosting" content="Авторизация">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>{t("common:accounts.login.h4")}</h4>
                <div className="form-group">
                    <label htmlFor="">{t("common:accounts.login.form.email.label")}</label>
                    <input type="text" className={errors["email"] && "warning"} {...register("email")} placeholder={t("common:accounts.login.form.email.placeholder")} minLength="3" maxLength="32"/>
                    {errors["email"] ? <p>{errors["email"].message}</p>: null}
                </div>
                <div className="form-group">
                    <label htmlFor="">{t("common:accounts.login.form.password.label")}</label>
                    <input type="password" className={errors["password"] && "warning"} {...register("password")} placeholder={t("common:accounts.login.form.password.placeholder")} />
                    {errors["password"] ? <p>{errors["password"].message}</p>: null}
                </div>
                <div className="submit">
                    <Link href="/accounts/password-reset">
                        <a>{t("common:accounts.forgot_password")}</a>
                    </Link>
                    {loading ? <Loader />: <input type="submit" value={t("common:accounts.enter")} />}
                </div>
            </form>
            <div className="register-block">
                <h4>{t("common:accounts.is_register")}</h4>
                <Link href="/accounts/register">
                    <a>{t("common:accounts.register.form.submit")}</a>
                </Link>
            </div>
        </AccountLayout>
    ) 
}

export default Login;