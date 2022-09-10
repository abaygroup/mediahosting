import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import ProductLayout from '../../../../hocs/productLayout';
import { useSelector } from 'react-redux';
import { BACKEND_URL } from '../../../../actions/types';
import ReactHtmlParser from 'react-html-parser';
import { AiFillPlayCircle } from 'react-icons/ai';


const VideoHosting = ({video, videohosting}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <ProductLayout
            title={video !== null && video.title}
        >
            {isAuthenticated &&
                <div className="videohosting-container">
                    <div className="video-block">
                        <div className="m-header">
                            <div className="logo">
                                <Link href={"/"}>
                                    <a><Image src="/images/full_logo_black.png" width={5636} height={1080} /></a>
                                </Link>
                            </div>
                        </div>
                        
                        <div className="youtube-frame">
                            <iframe src={video.frame_url} frameBorder="0" title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <div className="about-block">
                                <h1>{video.title}</h1>
                                <small>{ReactHtmlParser(video.body)}</small>
                            </div>
                        </div>
                    </div>
                    
                    <div className="playlist-block">
                        <div className="block">
                            {videohosting.map((video, i) => (
                                <Link href={`/product/${encodeURIComponent(router.query.isbn_code)}/videohosting/${encodeURIComponent(video.id)}`} key={i}>
                                    <a className="product-item">
                                        <div className="title" title={video.title}>
                                            <span className={router.query.id === video.id+'' && "played"}>{video.title}</span>
                                        </div>
                                        <div className="access">
                                            {router.query.id === video.id+'' && <AiFillPlayCircle />}
                                        </div>
                                    </a>
                                </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>
            }
        </ProductLayout>
    )
}

export async function getServerSideProps(context) {
    if (!context.req.cookies.access) {
        return {
            props: {
                video: null,
                videohosting: null
            }
          }
    } 

    const response = await fetch(`${BACKEND_URL}/api/product/${context.params.isbn_code}/videohosting/${context.params.id}/`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    })
    const data = await response.json()
    const video = data.video;
    const videohosting = data.videohosting;
    

    return {
        props: {
            video,
            videohosting
        }
    }
}

export default VideoHosting;