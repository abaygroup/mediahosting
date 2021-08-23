import { useRouter } from 'next/router';
import React from 'react';
import { BACKEND_URL } from '../../actions/types';
import Layout from '../../hocs/layout';

const Profile = ({profile}) => {
    const router = useRouter()
    return (
        <Layout
            title="Профиль"
            content="Страница профиля"
        >
            <div className="profile-container">
                <h1>{profile.first_name && profile.last_name ? <p>{profile.first_name} {profile.last_name}</p> : router.query.brandname}</h1>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(`${BACKEND_URL}/api/profile/`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    })
    
    const profile = await response.json()

    return {
      props: {
        profile
      },
    }
  }


export default Profile;