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
    background: black;
    display: flex;
    justify-content: center;
    z-index: 1000;

    .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        font-size: 14px;
    }

    .modal-block {
        padding: 60px;
        overflow: auto;

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
                color: silver;
                font-size: 14px;
            }
        }

        .body {
            font-size: 14px;
            color: silver;
        }
    }

    .edit-block {
        padding: 60px;
        overflow-y: auto;

        ::-webkit-scrollbar {
            width: 0;
        }
        
        form {
            display: flex;
            justify-content: center;
            align-items: center;

            .logotype {
                img {
                    width: 220px;
                    height: 220px;
                    border-radius: 50%;
                    margin: 10px auto;
                }
                input {
                    display: none;
                }
            }

            .profile-name {
                margin: 10px;
                
                .form-group {
                    text-align: center;
    
                    input {
                        display: block;
                        color: silver;
                        border: 1px solid #333;
                        background: #333;
                        padding: 5px 20px;
                        font-size: 20px;
                        margin: 10px 0;
                        border-radius: 50px;
                    }
                }
    
                .submit {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
    
                    input {
                        padding: 5px 20px;
                        border-radius: 50px;
                        border: 1px solid white;
                        background: white;
                        font-size: 14px;
                        cursor: pointer;
                    }
                }
            }
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
                            <Image src={data.logotype} width={512} height={512} />
                            <input type="file" {...register("logotype")}/>
                        </div>
                        <div className="profile-name">
                            <h2>Профиль данные</h2>
                            <div className="form-group">
                                <input type="text" defaultValue={data.first_name} {...register("first_name")}/>
                                <input type="text" defaultValue={data.last_name} {...register("last_name")}/>
                            </div>
                            <div className="submit">
                                <input type="submit" value="Сохранить" />
                            </div>
                        </div>
                    </form>
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

