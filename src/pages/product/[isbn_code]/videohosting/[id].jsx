import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import ProductLayout from '../../../../hocs/productLayout';
import { useSelector } from 'react-redux';
import { BACKEND_URL } from '../../../../actions/types';

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
                                <a><Image src="/icons/logo.png" width={5276} height={730} /></a>
                            </Link>
                        </div>
                        <div className="nav">
                            {/* <span>О продукте</span>
                            <span>Исходник</span>
                            <span>Авторы</span> */}
                        </div>
                    </div>
                    
                    <div className="youtube-frame">
                        <iframe src={video.frame_url} frameBorder="0" title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
                
                <div className="playlist-block">
                    <div className="block">
                        {videohosting.map((video, i) => (
                            <Link href={`/product/${encodeURIComponent(router.query.isbn_code)}/videohosting/${encodeURIComponent(video.id)}`} key={i}>
                                <a className="product-item">
                                    <div className="title" title={video.title}>
                                        <span>{video.title}</span>
                                    </div>
                                    <div className="access">
                                        {router.query.id === video.id+'' ?
                                            <Image width={100} height={100} src="https://img.icons8.com/color/96/000000/play-button-circled--v3.png"/>
                                        :
                                            <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAADVUlEQVR4nO2dPYsUMRyHxxMVVHwt9Ox8KRQUtFDQRjgstLivcI0fwNLW0tbyWkvbsxFBQQQRtBBUvE5RBF9AfMG31XssZgaze8ns7G6ymeR+T3k3m/x5CNn5zSTZohBCCCGEEEKI3AHmYtewJqBkCTgQu5as4T+/gGvA1tg1ZQmreQMsxK4rOyyia+4Cx2LXlw0NogF6wCKwO3adyTMg9otD+DvgIjATu95kGRC6CMwBTx3CHwNnYtecJIOiq79tAC4Bny2yV4DrwN7YtSeFTbTxv9lqlP+1CP8GXAE2xao9KZpEG9ecBB44ppNl4MK0606ONqKr62aABcovRhtLwP5p1p4UbUUb1++gTJA9i+zvwFWULlczqmjjc4eBW47RrXQ5yLiijc/PAy8dwpUuayYVXbWxmfIO5IdFttJlUfgRbbR1ELjhGN0fKe/N1/uqPSl8ijbaPAc8cwhfm+kyhOiq3Tbpco+v/jpPKNFG+7OV1BWL8DpdbvTdb+cILdro5xTw0DGd5J8upyW66qtOl+8dwvNNl9MUbfS5kzJd/rHIzjNdxhBt9H0cuOcY3a/JKV3GFG3UMA+8cgi/Qw7psguiqzrqdPnTIrtXTTXbY9U3MV0RbdRzCLjpGN3ppsuuia6hTJfPHcIfkVq67KroouhLl7a382mlyy6LrgH24U6XX0khXaYgugY4CzxxTCfLwPnYNTpJSXRR9KXLDw7h3UyXqYmuAXaRUrpMVXQNcAK47xjd3UmXqYsuiqIA1lXTyVuH8NvAkdhFJi+6BtiCO13+ppxqto3SplZ1pkYOI1pTxxRAX4ZhQbd3YUGBJTw0R/AXKIJPBs0PlT4Bl9FDpfFBj0nDw/AH/6dj1zgSXRNNu1dZ6QW2rohGL2enUsOw5QZHY9TllZii0QKa4H1qSVjgvrTIMbRotGw3rGiaF6KnsVTAB6FEo60V/YQQTfNmofSWc/nAp2i0/c2ND9EM39CZdqrzwaSiad6inMcich+MK5rmTfd5pTofjCoaHSMxHm1Fo4NRJqONaHTUz+Q0iabd4VX5pzof2ESjVOefQdHogMEwDIjUkZmhcIit0TE9vmiQrIOnfGIRrKPUQmAIVqoLSSVZqS406OdBhBBCCCGEECJN/gHYbshLFoHWbwAAAABJRU5ErkJggg==" />                                    
                                        }
                                    </div>
                                </a>
                            </Link>
                            )
                        )}
                    </div>
                </div>
            </div>}
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