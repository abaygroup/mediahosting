import React from 'react';
import Layout from '../hocs/layout';
import styled from 'styled-components';

const SettingContainer = styled.div`
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: black;
    color: white;

    h1 {
        margin-top: 50px;
    }
`;


const Setting = () => {
    return (
        <Layout
            title="Настройка | mediahosting"
            content="Вход на mediahosting, Аккаунты и настройки"
        >
            <SettingContainer>
                <h1>Setting page</h1>
            </SettingContainer>
        </Layout>
    )
}

export default Setting;