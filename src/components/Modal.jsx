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
        margin: 60px;
        overflow: auto;

        h4 {
            margin-bottom: 10px;
        }
        .body {
            font-size: 14px;
            color: silver;
        }
    }
`;

export const Modal = ({about, body, showModal, setShowModal}) => {
    return (
        <>
        {showModal ?
        <Background>
            <span className="close-btn" onClick={() => setShowModal(prev => !prev)}>Закрыть</span>
            <div className="modal-block">
                <h4>{about ? about : "Hello world"}</h4>
                <div className="body">{ReactHtmlParser(body)}</div>
            </div>
        </Background>
        : null}
        </>
    )
}

export const BodyModal = ({body, showModal, setShowModal}) => {
    return (
        <>
            {showModal ?
            <Background>
                <span className="close-btn" onClick={() => setShowModal(prev => !prev)}>Закрыть</span>
                <div className="modal-block">
                    <p>{body}</p>
                </div>
            </Background>
            : null}
        </>
    )
}

export const CommentModal = ({body, showModal, setShowModal}) => {
    return (
        <>
            {showModal ?
            <Background>
                <span className="close-btn" onClick={() => setShowModal(prev => !prev)}>Закрыть</span>
                <div className="modal-block">
                    <p>{body}</p>
                </div>
            </Background>
            : null}
        </>
    )
}

