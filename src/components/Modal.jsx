import React from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import Image from 'next/image';
import { useForm } from "react-hook-form";

const Background = styled.div`
    position: fixed;
    top:0; left: 0;
    width: 100%;
    height: 100%;
    background: #000000d9;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    z-index: 1000;

    .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        font-size: 14px;
    }

    .modal-block {
        max-width: 640px;
        margin: 50px auto;
        border-radius: 5px;
        padding: 40px;
        overflow: auto;
        background: #333;

        h4 {
            margin-bottom: 10px;
        }
        .features {
            list-style: none;
            display: flex;
            flex-direction: column;
            max-width: 820px;
            margin: 20px auto;

            li {
                display: flex;
                border-bottom: 1px solid silver;
                justify-content: space-between;
                padding: 10px;
                color: whitesmoke;
                font-size: 14px;
            }
        }

        .body {
            font-size: 14px;
            color: whitesmoke;
        }
    }

    .edit-block {
        max-width: 640px;
        margin: 50px auto;
        border-radius: 5px;
        padding: 40px;
        overflow: auto;
        background: #333;
        overflow-y: auto;

        ::-webkit-scrollbar {
            width: 0;
        }
        
        form {
            display: flex;
            justify-content: center;

            .logotype {
                img {
                    width: 180px;
                    height: 180px;
                    border-radius: 50%;
                    margin: 10px auto;
                }
                input {
                    display: none;
                }
            }

            .profile-name {
                margin: 10px 20px;

                h2 {
                    margin-bottom: 20px;
                }
                
                .form-group {
                    text-align: center;
    
                    input {
                        display: block;
                        color: silver;
                        border: 1px solid #b3b3b352;
                        background: #b3b3b352;
                        padding: 5px 20px;
                        font-size: 20px;
                        margin: 10px 0;
                        border-radius: 5px;
                    }
                }
    
                .submit {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                    transition: all .3s;
    
                    input {
                        padding: 5px 20px;
                        border-radius: 50px;
                        border: 1px solid white;
                        background: white;
                        font-size: 14px;
                        cursor: pointer;
                    }

                    &:hover {
                        opacity: .7;
                    }
                }
            }
        }

        small.conf {
            font-size: 12px;
            color: silver;
            text-align: center;
            display: block;
            margin-top: 20px;
        }
    }


    // mediaqueries
    // ========================================
    @media screen and (max-width: 820px) {
        .edit-block {
            form {
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;

                .logotype {
                    img {
                        width: 160px;
                        height: 160px;
                    }
                }

                .profile-name {
                    h2 {
                        text-align: center;
                    }
                }
            }
        }
    
    }


    @media screen and (max-width: 420px) {
        .modal-block {
            padding: 60px 20px;
        }

        .edit-block {
            padding: 60px 20px;

            form {
                .logotype {
                    img {
                        width: 120px;
                        height: 120px;
                    }
                }

                .profile-name {
                    h2 {
                        text-align: center;
                    }

                    .form-group {
                        input {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
`;

export const Modal = ({about, features, body, showModal, setShowModal}) => {
    return (
        <>
        {showModal ?
        <Background>
            <span className="close-btn" onClick={() => setShowModal(prev => !prev)}>Закрыть</span>
            <div className="modal-block">
                <h4>{about ? about : "Hello world"}</h4>
                {features.length > 0 &&
                <ul className="features">
                    {features.map((feature, i) => (
                        <li key={i}>
                            <b>{feature.label}:</b><span>{feature.value}</span>
                        </li>
                    ))}
                </ul>}
                <div className="body">{ReactHtmlParser(body)}</div>
            </div>
        </Background>
        : null}
        </>
    )
}

export const EditModal = ({data, showModal, setShowModal}) => {
    const { register, handleSubmit } = useForm();
    
    const saveProfile = (data) => {
        alert(JSON.stringify(data));
        alert("Эти компоненты еще не готовы. Предпологаем следующее версий")
    }
   
    return (
        <>
            {showModal ?
            <Background>
                <span className="close-btn" onClick={() => setShowModal(prev => !prev)}>Закрыть</span>
                <div className="edit-block">
                    <form onSubmit={handleSubmit(saveProfile)}>
                        <div className="logotype" >
                            <Image src={data.avatar ? data.avatar : "/icons/avatar.jpg"} width={512} height={512} />
                            <input type="file" {...register("logotype")}/>
                        </div>
                        <div className="profile-name">
                            <h2>Профиль данные</h2>
                            <div className="form-group">
                                <input type="text" defaultValue={data.full_name} {...register("full_name")}/>
                            </div>
                            <div className="submit">
                                <input type="submit" value="Сохранить" />
                            </div>
                        </div>
                    </form>
                    <small className="conf">
                        Продолжая, ты предоставляешь Mediahosting доступ к выбранному изображению. 
                        Пожалуйста, не загружай файлы, которые ты не имеешь права распространять.
                    </small>
                </div>
            </Background>
            : null}
        </>
    )
}

// export const BodyModal = ({body, showModal, setShowModal}) => {
//     return (
//         <>
//             {showModal ?
//             <Background>
//                 <span className="close-btn" onClick={() => setShowModal(prev => !prev)}>Закрыть</span>
//                 <div className="modal-block">
//                     <p>{body}</p>
//                 </div>
//             </Background>
//             : null}
//         </>
//     )
// }

// export const CommentModal = ({body, showModal, setShowModal}) => {
//     return (
//         <>
//             {showModal ?
//             <Background>
//                 <span className="close-btn" onClick={() => setShowModal(prev => !prev)}>Закрыть</span>
//                 <div className="modal-block">
//                     <p>{body}</p>
//                 </div>
//             </Background>
//             : null}
//         </>
//     )
// }

