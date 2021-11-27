import React, { useState } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import useTranslation from 'next-translate/useTranslation';
import { BACKEND_URL } from '../actions/types';
import router from 'next/router';


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
    overflow: auto;

    .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        font-size: 14px;
    }

    .modal-block {
        max-width: 720px;
        margin: 50px auto;
        border-radius: 5px;
        padding: 40px;
        background: #333;
        overflow-x: scroll;

        h4 {
            margin-bottom: 10px;
        }
        .features {
            list-style: none;
            display: flex;
            flex-direction: column;
            max-width: 720px;
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

            h1, h4 {
                margin-bottom: 10px;
                text-align: center;
            }
            h4 {
                color: silver;
            }
    
            h1, h2, h3, h4, h5, h6 {
                margin: 5px 0;
            }
    
            ul {
                li {
                    margin-left: 10px;
                }
            }
    
            img {
                display: block;
                margin: 10px auto;
            }
    
            a {
                color: silver;
                text-decoration: underline;
    
                &:hover {
                    color: white;
                }
            }
        }
    }

    .edit-block, .album-block {
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
                label {
                    
                    img {
                        width: 180px;
                        height: 180px;
                        border-radius: 50%;
                        margin: 10px auto;
                        cursor: pointer;
                    }
                   
                    small {
                        display: block;
                        text-align: center;
                        color: silver;
                    }
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
                        border: 1px solid #b3b3b352;
                        background: #b3b3b352;
                        color: white;
                        font-family: "Inter", sans-serif;
                        font-weight: 300;
                        padding: 5px 15px;
                        font-size: 15px;
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

    .album-block {
        max-width: 1024px;
        padding: 0;

        img {
            border-radius: 5px;
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
            padding: 60px 10px;
            margin-left: 10px;
            margin-right: 10px;

            .body {
                p {
                    max-width: 300px;
                }
            }
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
    const { t } = useTranslation();

    return (
        <>
        {showModal ?
        <Background>
            <span className="close-btn" onClick={() => setShowModal(prev => !prev)}>{t("common:modal.close")}</span>
            <div className="modal-block">
                <h4>{about ? about : ""}</h4>
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

export const EditModal = ({data, showModal, setShowModal, access}) => {
    const { register, handleSubmit } = useForm();
    const { t } = useTranslation();
    const [avatarImg, setAvatarImg] = useState(null);

    const handleChange = e => {
		if ([e.target.name].toString() === 'avatar') {
			setAvatarImg(e.target.files);
		}
    }
    
    const saveProfile = async (registerData) => {
        const formData = new FormData();
        avatarImg && formData.append('avatar', avatarImg[0]);
        formData.append('profile_name', registerData.profile_name);


        try {
            await fetch(`${BACKEND_URL}/api/profile/${data.user.username}/`, {
                method: "PUT",
                headers: {
                    "Authorization": `JWT ${access}`
                },
                body: formData
            })

            setShowModal(prev => !prev)
            router.push(`/profile/${data.user.username}`);

        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
            {showModal ?
            <Background>
                <span className="close-btn" onClick={() => setShowModal(prev => !prev)}>{t("common:modal.close")}</span>
                <div className="edit-block">
                    <form onSubmit={handleSubmit(saveProfile)}>
                        <div className="logotype">
                            <label htmlFor="avatar">
                                <Image src={data.avatar ? data.avatar : "/icons/avatar.jpg"} width={512} height={512} />
                                <small>{avatarImg && avatarImg[0].name}</small>
                            </label>
                            <input type="file" id="avatar" {...register("avatar")} onChange={handleChange} />
                        </div>
                        <div className="profile-name">
                            <h2>{t("common:modal.edit-block.h2")}</h2>
                            <div className="form-group">
                                <input type="text" defaultValue={data.user.profile_name} {...register("profile_name")}/>
                            </div>
                            <div className="submit">
                                <input type="submit" value={t("common:modal.button")} />
                            </div>
                        </div>
                    </form>
                    <small className="conf">{t("common:modal.edit-block.conf")}</small>
                </div>
            </Background>
            : null}
        </>
    )
}


export const AlbumModal = ({album, albumModal, setAlbumModal}) => {
    const { t } = useTranslation();

    return (
        <>
           {albumModal ?
            <Background>
                <span className="close-btn" onClick={() => setAlbumModal(prev => !prev)}>{t("common:modal.close")}</span>
                <div className="album-block">
                    <Image src={album ? album : '/icons/noimage.jpg'} width={1280} height={720} />                
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

