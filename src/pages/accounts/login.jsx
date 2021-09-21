import React, { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { check_auth_status, login } from '../../actions/auth';
import Loader from '../../components/Loader';

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
    const dispatch = useDispatch()

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
        router.push("/");

    return (
        <React.Fragment>
            <Head>
                <title>Авторизация | mediahosting</title>
                <link rel="shortcut icon" href="/icons/m-black.png" />
            </Head>
            <div className="accounts-container">
                <div className="head">
                    <Link href="/"><a className="back"><Image width={100} height={100} src="https://img.icons8.com/ios/100/000000/back--v1.png"/></a></Link>
                    <Image width={5276} height={730} src="/icons/logo-black.png" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4>Чтобы продолжить, войдите в mediahosting.</h4>
                    <div className="form-group">
                        <label htmlFor="">Email адрес</label>
                        <input type="text" {...register("email")} placeholder="example@gmail.com" minLength="3" maxLength="32"/>
                        {errors["email"] ? <p>{errors["email"].message}</p>: null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Пароль</label>
                        <input type="password" {...register("password")} placeholder="Введите пароль" />
                        {errors["password"] ? <p>{errors["password"].message}</p>: null}
                    </div>
                    <div className="submit">
                        <Link href="https://dashboard.abaystreet.com/accounts/password/reset">
                            <a target="_blank">Забыли пароль</a>
                        </Link>
                        {loading ? <Loader />: <input type="submit" value="Войти" />}
                    </div>
                </form>
                <div className="register-block">
                    <h4>Нет аккаунта?</h4>
                    <Link href="/accounts/register">
                        <a>Регистрация</a>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    ) 
}

export default Login;