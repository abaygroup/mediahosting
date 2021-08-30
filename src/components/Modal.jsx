import React from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

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
    }


    // mediaqueries
    // ========================================
    @media screen and (max-width: 420px) {
        .modal-block {
            padding: 60px 20px;
        }

        .edit-block {
            padding: 60px 20px;
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

export const EditModal = ({showModal, setShowModal}) => {
    return (
        <>
            {showModal ?
            <Background>
                <span className="close-btn" onClick={() => setShowModal(prev => !prev)}>Закрыть</span>
                <div className="edit-block">
                    <h1>Edit modal</h1>
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

