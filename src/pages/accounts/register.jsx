import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { check_auth_status } from '../../actions/auth';
import { signup } from '../../actions/auth';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BACKEND_URL } from '../../actions/types';


const Register = () => {
    const [emailList, setEmailList] = useState([])
    const [brandList, setBrandList] = useState([])

    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/accounts/users/`, {
                    headers: {'Content-Type': 'application/json'}  
                })
                const data = await res.json()
                data.map(user => {
                    setEmailList(emailList => [...emailList, user.email])
                    setBrandList(brandList => [...brandList, user.brandname])
                })
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
        return () => cleanupFunction = true; 
    }, [])

    const schema = yup.object().shape({
        brandname: yup.string()
        .notOneOf(brandList, 'Имя такое же пользователь уже существует')
        .min(3, "Минимум 3 символа")
        .max(32, "Максимум 32 символов")
        .matches(
            /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, 
            "Введите правильные имя пользователя")
        .required('Требуется имя пользователя'),
        email: yup.string()
            .email('Электронная почта должна быть действительной')
            .notOneOf(emailList, 'Электронная почта уже существует')
            .required('Электронная почта требуется')
            .max(32, "Максимум 32 символов"),
        password: yup.string()
            .required('Необходим пароль')
            .min(6, 'Пароль должен состоять из 6 или более символов')
            .matches(
                /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Пароль должен состоять не менее чем из 6 символов, одного верхнего регистра, одной цифры и одного символа специального регистра."
              ),
        re_password: yup.string()
            .required('Необходим подтверждение пароль')
            .min(6).oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
    });


    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch()
    const register_success = useSelector(state => state.auth.register_success);
    const { register, formState:{ errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(signup(data.brandname, data.email, data.password, data.re_password));
    };


    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);

    if (typeof window !== "undefined" && isAuthenticated)
        router.push("/");


        if (register_success)
            router.push('/accounts/login');
    return (
        <React.Fragment>
            <Head>
                <title>Регистрация | mediahosting</title>
                <link rel="shortcut icon" href="/icons/m-black.png" />
            </Head>
            <div className="accounts-container">
                <div className="head">
                    <Link href="/"><a className="back"><Image width={100} height={100} src="https://img.icons8.com/ios/100/000000/back--v1.png"/></a></Link>
                    <Image width={5276} height={730} src="/icons/logo-black.png" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4>Зарегистрируйтесь бесплатно, чтобы начать обучаться.</h4>
                    <div className="form-group">
                        <label htmlFor="">Имя пользователя</label>
                        <input type="text" {...register("brandname")} placeholder="Ваше имя пользователья" />
                        {errors["brandname"] ? <p>{errors["brandname"].message}</p>: null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email адрес</label>
                        <input type="email" {...register("email")} placeholder="example@gmail.com"/>
                        {errors["email"] ? <p>{errors["email"].message}</p>: null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Пароль</label>
                        <input type="password" {...register("password")} placeholder="Введите пароль" minLength="8"/>
                        {errors["password"] ? <p>{errors["password"].message}</p>: null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Повторить пароль</label>
                        <input type="password" {...register("re_password")} placeholder="Введите пароль еще раз" minLength="8"/>
                        {errors["re_password"] ? <p>{errors["re_password"].message}</p>: null}
                    </div>
                    <div className="submit">
                        <span></span>
                        {loading ? <Loader />: <input type="submit" value="Регистрация" />}
                    </div>
                </form>
                <div className="register-block">
                    <h4>У вас есть аккаунт?</h4>
                    <Link href="/accounts/login">
                        <a>Войти</a>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Register;