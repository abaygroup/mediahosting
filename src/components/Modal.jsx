import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    position: fixed;
    top:0; left: 0;
    width: 100%;
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
`;

export const Modal = ({body, showModal, setShowModal}) => {
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

