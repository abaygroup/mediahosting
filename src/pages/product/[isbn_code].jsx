import Layout from "../../hocs/layout";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BACKEND_URL } from "../../actions/types";
import { useSelector } from "react-redux";
import Link from "next/link";
import React, { useState } from "react";
import { Modal } from "../../components/Modal";
import useTranslation from "next-translate/useTranslation";

const ProductDetail = ({product, videohosting, published_count, private_count}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const router = useRouter();
    const [productModal, setProductModal] = useState(false)
    const { t } = useTranslation();

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    const modalHandler = () => {
        setProductModal(prev => !prev);
    }

    const bodyCommentHandle = () => {
        alert("Эти компоненты еще не готовы. Предпологаем следующее версий")
    }

    return (
        <Layout
            title={product !== null ? product.title : "Продукт"}
            content="Страница продуктов"
        >
            {isAuthenticated &&
            <>
            <Modal about={product.about} body={product.body} showModal={productModal} setShowModal={setProductModal} />
            <div className="product-container">
                <div className="head" style={{backgroundImage: `url(${product.picture})`}}>
                    <div className="backdrop">
                        <Image src={product.picture ? product.picture : '/icons/noimage.jpg'} width={820} height={480} />
                        <div className="product-name">
                            <h4 className="production"> 
                                <Image width={100} height={100} src="https://img.icons8.com/fluent/48/000000/verified-badge.png" alt="" />
                                <span>{t("common:product.production")}</span>
                            </h4>
                            <h1 onClick={modalHandler}>{product.title}</h1>
                            <small>{published_count} {t("common:product.published_count")} | {private_count} {t("common:product.private_count")}</small>
                        </div>
                        <div className="handlers">
                            <div onClick={bodyCommentHandle} className="favorite" title="Добавить">
                                <Image width={100} height={100} src="data:image/png;base64,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" />
                            </div>
                            <div onClick={bodyCommentHandle} className="follow" title="Подписаться">
                                <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAA3ElEQVR4nO3bMQ7DIBAAQcj//0zaxK2xvJZnOjrQiu5uDAAAAAAAAOC95t0XOGuttX7Pc85Hv+lz9wX4J0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSs21S/DiF/ja7pu79kBhBYgSJefS20Rg2qLiYIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSI0iMIDGCxAgSIwgAAAAAAABAxhdm+gx+sldCogAAAABJRU5ErkJggg==" />
                            </div>
                        </div>
                    </div>
                </div>

                {product.production ?
                <div className="product-block">
                    <div className="subtitles">
                        <small>{t("common:product.subtitle.one")}</small>
                        <small>{t("common:product.subtitle.two")}</small>
                        <small>{t("common:product.subtitle.three")}</small>
                    </div>
                    <div className="block">
                    {videohosting.map((video, i) => {
                        const date = new Date(Date.parse(video.timestamp))
                        return (
                            <React.Fragment key={i}>
                                {video.access ?
                                    <Link href={`/product/${encodeURIComponent(product.isbn_code)}/videohosting/${encodeURIComponent(video.id)}`}>
                                        <a className="product-item">
                                            <div className="picture">
                                                <Image width={1920} height={1080} src={product.picture} alt="" />
                                                <div className="body-comments">
                                                    <span onClick={bodyCommentHandle} className="body">
                                                        <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAAhklEQVR4nO3ZsRGAMAwEQUT/PYsOMNGPjHdjBxpf+NcFAACQVasH3d2JQ05RVa9/fqcO4RtBhhEEAAAAAACAKJt6mE19M4IMIwgAAAAAAABRNvUwm/pmBBlGEAAAAAAAAKJs6mE29c0IMowgAAAAAAAARP1+U19t2NNYDIcRZBhBAAAADvcAB34UJNfaZ00AAAAASUVORK5CYII=" />
                                                    </span>
                                                    <span onClick={bodyCommentHandle} className="comments">
                                                        <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAEE0lEQVR4nO3dT6hUZRzG8ee1bhRKbVpEYLTRIoIEwwxaGEggpNf+7GrXKtq2SFoFdgNdhIW7IIgKEsqLLWvRJhTLbBHULRApdWGUoTf1ks23xTnS9Z0zM2dmzsz8nHk+cBdn7vue897fc885c2bgfSUzMzMzM7PxSnUaAXOS5iXtlrRZ0npJa0c4rmmwLOmMpBOSDks6klL6p1ennoEA85L2S9ow7Ahn3C+SXk0pHenWaE2nXwBrgLckLcphNGGDpEVgAehY91u77OBNSa81PqzZliTtkYSk12v3AuaBFje6ChwAHgN8/+gBWFvW6p2ydqu1gJ11dzQH/Jzt4AzwyIj/hqkFbCpruNpS+WapZ+fnK84MhzGkMpT8THmuTscPs04HxjDemQC8m9X2gzqdfso6bRnDWGcCsDWr7Y91Ol3KOq0bw1hnArAuq+3FvE3bgyHADQ1SqvU0b/X0qm/HBxSbDAcSjAMJxoEE40CCcSDBOJBgHEgwDiQYBxKMAwnGgQTjQIJxIME4kGAcSDAOJBgHEowDCcaBBONAgnEgwTiQYBxIMA4kGAcSjAMJxoEE40CCcSDBOJBgHEgwDiQYBxKMAwnGgQTjQIJxIME4kGAcSDAOJBgHEowDCcaBBONAgnEgwTiQYKoCubR6wxOYNQe4M3upbQKzqkDOZdsPNTYiy2uZ17oykG+z7RcbG469kG1/07NHh2liN41mfLOjnCZ2Javts3U6dppI2aEMiGEmUi53sIv2qcZXKOad3eobfW/lDKSPlzXLz4wW8HS/O1ygGb8CTw3wB+0EzjU0hmj29luP68tVLNB+pgziVJ/HvgM438Bxo2kBe4HBp96luHwtNTCYu/o45ksNHC+aJWpcpvpZ8miXimWPHlWx5FG/95HNKaXvah7ve0k3+wIAy5J+U/EYsSjp8zpLHo0McDz7D5mv2W9H1u8U0G3hmakyys+yLmfbPReBKQu/L3t5f0rpWmOjCm6UgSxn23VW5XlZ0sOrtk9Ler+xEd0ERhlIfr38u1tj4EFJC9nLe1JKVxsd1awCjmX3gu1d2t4OnMzaf8kwbw/tfxTPMBeyAm/s0HYOOJy1/Qu4b9zjnlrAlqzA56v+24FbgE+yti3gmUmMe2oB72VF/rSizd3AF7R7YxJjnlrAA8CVrMg7sjZPAqcrwjg4qXFPJeA24OusyCevX66A+4GPKoIAeLvqsmYDorg5f5YV+V/gCWA7cAi4VhHEFeCVSY9/qgDrga8qin0R+KPDGQHFEn3+4qtJwDbgzy5Fr3IZ2Ie/6Goe8EMfQawAB4F7Jz3uqJr4FLXV4/dIOirpY0mHUkq/N3DMqTX0uxpgm4oPAO+RdKH8Oavie4ATko6llM4OexwzMzMzMzMbjf8A577UR1OOzVAAAAAASUVORK5CYII=" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="title">
                                                <span>{video.title}</span>
                                            </div>
                                            <div className="timestamp">
                                                <small>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</small>
                                            </div>
                                            <div className="access">
                                                <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAADVUlEQVR4nO2dPYsUMRyHxxMVVHwt9Ox8KRQUtFDQRjgstLivcI0fwNLW0tbyWkvbsxFBQQQRtBBUvE5RBF9AfMG31XssZgaze8ns7G6ymeR+T3k3m/x5CNn5zSTZohBCCCGEEEKI3AHmYtewJqBkCTgQu5as4T+/gGvA1tg1ZQmreQMsxK4rOyyia+4Cx2LXlw0NogF6wCKwO3adyTMg9otD+DvgIjATu95kGRC6CMwBTx3CHwNnYtecJIOiq79tAC4Bny2yV4DrwN7YtSeFTbTxv9lqlP+1CP8GXAE2xao9KZpEG9ecBB44ppNl4MK0606ONqKr62aABcovRhtLwP5p1p4UbUUb1++gTJA9i+zvwFWULlczqmjjc4eBW47RrXQ5yLiijc/PAy8dwpUuayYVXbWxmfIO5IdFttJlUfgRbbR1ELjhGN0fKe/N1/uqPSl8ijbaPAc8cwhfm+kyhOiq3Tbpco+v/jpPKNFG+7OV1BWL8DpdbvTdb+cILdro5xTw0DGd5J8upyW66qtOl+8dwvNNl9MUbfS5kzJd/rHIzjNdxhBt9H0cuOcY3a/JKV3GFG3UMA+8cgi/Qw7psguiqzrqdPnTIrtXTTXbY9U3MV0RbdRzCLjpGN3ppsuuia6hTJfPHcIfkVq67KroouhLl7a382mlyy6LrgH24U6XX0khXaYgugY4CzxxTCfLwPnYNTpJSXRR9KXLDw7h3UyXqYmuAXaRUrpMVXQNcAK47xjd3UmXqYsuiqIA1lXTyVuH8NvAkdhFJi+6BtiCO13+ppxqto3SplZ1pkYOI1pTxxRAX4ZhQbd3YUGBJTw0R/AXKIJPBs0PlT4Bl9FDpfFBj0nDw/AH/6dj1zgSXRNNu1dZ6QW2rohGL2enUsOw5QZHY9TllZii0QKa4H1qSVjgvrTIMbRotGw3rGiaF6KnsVTAB6FEo60V/YQQTfNmofSWc/nAp2i0/c2ND9EM39CZdqrzwaSiad6inMcich+MK5rmTfd5pTofjCoaHSMxHm1Fo4NRJqONaHTUz+Q0iabd4VX5pzof2ESjVOefQdHogMEwDIjUkZmhcIit0TE9vmiQrIOnfGIRrKPUQmAIVqoLSSVZqS406OdBhBBCCCGEECJN/gHYbshLFoHWbwAAAABJRU5ErkJggg==" />                                    
                                            </div>
                                        </a>
                                    </Link>
                                    :
                                    <div className="product-item">
                                        <div className="picture">
                                            <Image width={1920} height={1080} src={product.picture} alt="" />
                                            <div className="body-comments">
                                                <span onClick={bodyCommentHandle} className="body">
                                                    <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAAhklEQVR4nO3ZsRGAMAwEQUT/PYsOMNGPjHdjBxpf+NcFAACQVasH3d2JQ05RVa9/fqcO4RtBhhEEAAAAAACAKJt6mE19M4IMIwgAAAAAAABRNvUwm/pmBBlGEAAAAAAAAKJs6mE29c0IMowgAAAAAAAARP1+U19t2NNYDIcRZBhBAAAADvcAB34UJNfaZ00AAAAASUVORK5CYII=" />
                                                </span>
                                                <span onClick={bodyCommentHandle} className="comments">
                                                    <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAEE0lEQVR4nO3dT6hUZRzG8ee1bhRKbVpEYLTRIoIEwwxaGEggpNf+7GrXKtq2SFoFdgNdhIW7IIgKEsqLLWvRJhTLbBHULRApdWGUoTf1ks23xTnS9Z0zM2dmzsz8nHk+cBdn7vue897fc885c2bgfSUzMzMzM7PxSnUaAXOS5iXtlrRZ0npJa0c4rmmwLOmMpBOSDks6klL6p1ennoEA85L2S9ow7Ahn3C+SXk0pHenWaE2nXwBrgLckLcphNGGDpEVgAehY91u77OBNSa81PqzZliTtkYSk12v3AuaBFje6ChwAHgN8/+gBWFvW6p2ydqu1gJ11dzQH/Jzt4AzwyIj/hqkFbCpruNpS+WapZ+fnK84MhzGkMpT8THmuTscPs04HxjDemQC8m9X2gzqdfso6bRnDWGcCsDWr7Y91Ol3KOq0bw1hnArAuq+3FvE3bgyHADQ1SqvU0b/X0qm/HBxSbDAcSjAMJxoEE40CCcSDBOJBgHEgwDiQYBxKMAwnGgQTjQIJxIME4kGAcSDAOJBgHEowDCcaBBONAgnEgwTiQYBxIMA4kGAcSjAMJxoEE40CCcSDBOJBgHEgwDiQYBxKMAwnGgQTjQIJxIME4kGAcSDAOJBgHEowDCcaBBONAgnEgwTiQYKoCubR6wxOYNQe4M3upbQKzqkDOZdsPNTYiy2uZ17oykG+z7RcbG469kG1/07NHh2liN41mfLOjnCZ2Javts3U6dppI2aEMiGEmUi53sIv2qcZXKOad3eobfW/lDKSPlzXLz4wW8HS/O1ygGb8CTw3wB+0EzjU0hmj29luP68tVLNB+pgziVJ/HvgM438Bxo2kBe4HBp96luHwtNTCYu/o45ksNHC+aJWpcpvpZ8miXimWPHlWx5FG/95HNKaXvah7ve0k3+wIAy5J+U/EYsSjp8zpLHo0McDz7D5mv2W9H1u8U0G3hmakyys+yLmfbPReBKQu/L3t5f0rpWmOjCm6UgSxn23VW5XlZ0sOrtk9Ler+xEd0ERhlIfr38u1tj4EFJC9nLe1JKVxsd1awCjmX3gu1d2t4OnMzaf8kwbw/tfxTPMBeyAm/s0HYOOJy1/Qu4b9zjnlrAlqzA56v+24FbgE+yti3gmUmMe2oB72VF/rSizd3AF7R7YxJjnlrAA8CVrMg7sjZPAqcrwjg4qXFPJeA24OusyCevX66A+4GPKoIAeLvqsmYDorg5f5YV+V/gCWA7cAi4VhHEFeCVSY9/qgDrga8qin0R+KPDGQHFEn3+4qtJwDbgzy5Fr3IZ2Ie/6Goe8EMfQawAB4F7Jz3uqJr4FLXV4/dIOirpY0mHUkq/N3DMqTX0uxpgm4oPAO+RdKH8Oavie4ATko6llM4OexwzMzMzMzMbjf8A577UR1OOzVAAAAAASUVORK5CYII=" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="title">
                                            <span>{video.title}</span>
                                        </div>
                                        <div className="timestamp">
                                            <small>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</small>
                                        </div>
                                        <div className="access">
                                            <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAE/ElEQVR4nO2dzWsdVRjGn2OTCrbWj1ZrNN1obSiooC60CAZdSsGFUkWDIEgXVrQIduHKv0DQVWtxo24Ul3WlaDea2NYGokharRuV1kXVmpsItunPxYx1cu7cJPfmzpl3kvcHd3Fuzsz7zHly5sz5mHMlx3Ecx3Ecp/+EugV0AzAk6RFJD0oakXS7pM2SNuZZWpLOS/pJ0rSkCUlfhBDOpVe7SgG2AK8AJ+idY8DLwJa6r6exANuAt4G5FRgRMwu8BQzXfX2NARgkqxEzfTQiZg54A7i67uuNMdWGADslfSjp7g5ZLkkal3RU0qSyduKcsrZDytqSIWXty736v70Z6HC+KUlPhRCm+6F/VQHsAVod/qN/BPYDN/dw3q35sWc6nHsGeLKKa2oswD5gvqSwfgHGgHV9iDEAPAf8WhJnHnixH9fSeHIzyjgIXFtBvE3AOx1irm1TyG5Tcc34G3g6Qexn8lhxTXmi6tgmAXbS3mb8CTycUMNoHrPIDLAjlQYTAOuBqagg5lKaUdAyWlJTJoHB1FpqA3i95P5d+W1qET3Plug5UJeepJD1wGejiz9oQNfhSFMLuLVuXZVDNhxS5CxwnQFdm2h/JH6zbl2VAtxE+9jUWN26/gN4vqSWbK5bV2WQ9ZiLnAE6DWskB1gH/BBpfKluXZVB+xD6/ro1xQCvRhq/rltTJQBDwOXChV4EttatKybXeamg8zJwS6r4V6UKJOlRLRxdHg8h/JYw/rIIIZyVdKz4laTRVPFTGvJAlD6aMHa3fB6ld6UKnNKQkSh9MmHsbpmM0smGUlIasj1Kn04Yu1tORek7UwVOacj1UdrySpBYW6y9MlIasjFKt0pz2WAmSvd9XqYTyebUARYEDsHUfH5MXXpT1hBnGbghxnBDjOGGGMMNMYYbYgw3xBhuiDHcEGP03PsE1kvaK2lM0l2SNvRLVEOZlfStpA8kHQ4h/NPLSXoyhGx5zBFlS/6ddk5K2p1PdnVF14bkNWNCbsZSfCNpVwjhYjcH9dKG7JWbsRzul/RC5VGAiWhVxhHgtsoDGwcYBj6JyuarFIHjd//8BcocsmWyRf7q9hy9tCGNmtdIzUrLx/shxnBDjOGGGMMNMYYbYgw3xBhuiDHcEGO4IcZwQ4zhhhjDDTGGG2KMxhoCbAAO5G/2tvLPceA14Jq69SUjGu9n6SMq0bAdOB1rKTAN3FGTtrTlU7chec04tYgZRVOS15SVlk8Tb1n7tLyXMEckNW6HuCYasqeivCZo3BQu0NLyF+W1QgjJ3g+U1uYU7nxFeU3QREO+ryivCZpoyHsV5W0mBh57B4DxZTz2fkkNe3GttHwa16jnGm6Q9PsS2W4MIfyRQk+RlZZPIw0p0xFjRddaeMpa1bghxnBDjOGGGKPJhsRbKBW5kExFn2myIZ8u8rfPkqmom7o7hgUdO4DzJR3C80CyLflKdKUtHyuG5FqGgY+AC/nn4zrNyDWtvZ66ZbxjuMpwQ4zhhhjDDTGGG2IMN8QYbogx3BBjuCHGcEOM4YYYww0xhhtijF4MWTBTh29gdgVgW/TVYrOapfRiSLxe9pCbcsWMQ9HX33V7nl6WWr6vhT+B95ikn2ueq7JK12uLe90mdlzSfd0eu8Y4LumhyreJzXds3q1sX1qnnBOSHu/WDGllW40PKtuXdkzSPWr/Fba1RkvSlLJb+ru9mCFJ/wJk1x8S2z+R/AAAAABJRU5ErkJggg==" />
                                        </div>
                                    </div>
                                }
                            </React.Fragment>
                        )
                    })}
                    </div>
                </div> : <small className="empty">{t("common:product.empty")}</small>}
            </div>
            </>}
        </Layout>
    )
}

export async function getServerSideProps(context) {
    if (!context.req.cookies.access) {
        return {
            props: {
              product: null,
              videohosting: null
            },
          }
    } 

    const response = await fetch(`${BACKEND_URL}/api/product/${context.params.isbn_code}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    })
    
    const data = await response.json()
    const product = data.product;
    const videohosting = data.videohosting
    const published_count = data.published_count;
    const private_count = data.private_count;

    return {
        props: {
            product,
            videohosting,
            published_count,
            private_count
        },
    }
}

export default ProductDetail;