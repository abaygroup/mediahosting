import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { check_auth_status, login } from '../../actions/auth';
import Loader from '../../components/Loader';

const Login = () => {
    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm();

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
        router.push("/");

    return (
        <React.Fragment>
            <Head>
                <title>Авторизация | mediahosting</title>
                <link rel="shortcut icon" href="https://abayst.netlify.app/icon64.png" />
            </Head>
            <div className="accounts-container">
                <div className="head">
                    <Link href="/"><a className="back"><img src="https://img.icons8.com/ios/100/000000/back--v1.png"/></a></Link>
                    <img src="../icons/mediahosting-black.png" alt="" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4>Чтобы продолжить, войдите в mediahosting.</h4>
                    <div className="form-group">
                        <label htmlFor="">Email адрес</label>
                        <input type="text" {...register("email")} placeholder="example@gmail.com" minLength="3" maxLength="32" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Пароль</label>
                        <input type="password" {...register("password")} placeholder="Введите пароль" minLength="8" required/>
                    </div>
                    <div className="submit">
                        <a href="https://dashboard.abaystreet.com/accounts/password/reset">Забыли пароль</a>
                        {loading ? <Loader />: <input type="submit" value="Войти" />}
                    </div>
                </form>
                <div className="register-block">
                    <h4>Нет аккаунта?</h4>
                    <a target="_blank" href="https://dashboard.abaystreet.com/accounts/register">Регистрация</a>
                </div>
            </div>
        </React.Fragment>
    ) 
}

export default Login;