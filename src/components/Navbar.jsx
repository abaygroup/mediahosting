import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

const Navbar = () => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="navbar-container">
            <div className="logo">
                <Link href="/">
                    <a><Image src="/icons/logo-black.png" width={5276} height={730} /></a>
                </Link>
            </div>
            <ul>
                <li className={router.pathname == "/" ? "active" : ""}>
                    <Link href="/">
                        <a>
                            {router.pathname == '/' ?
                                <Image width={100} height={100} alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTQ0IiBoZWlnaHQ9IjE0NCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMTQxLjU0MTY3LDE1NC4wODMzM2gtMzIuMjVjLTQuOTQ4NTgsMCAtOC45NTgzMywtNC4wMDk3NSAtOC45NTgzMywtOC45NTgzM3YtMzIuMjVjMCwtMy45NTk1OCAtMy4yMDcwOCwtNy4xNjY2NyAtNy4xNjY2NywtNy4xNjY2N2gtMTQuMzMzMzNjLTMuOTU5NTgsMCAtNy4xNjY2NywzLjIwNzA4IC03LjE2NjY3LDcuMTY2Njd2MzIuMjVjMCw0Ljk0ODU4IC00LjAwOTc1LDguOTU4MzMgLTguOTU4MzMsOC45NTgzM2gtMzIuMjVjLTQuOTQ4NTgsMCAtOC45NTgzMywtNC4wMDk3NSAtOC45NTgzMywtOC45NTgzM3YtNjguMzk1MDhjMCwtOC4yMzgwOCAzLjc3NjgzLC0xNi4wMjEwOCAxMC4yNDQ3NSwtMjEuMTE2NThsNTAuOTI2MzMsLTQwLjEyOTc1YzEuOTUyOTIsLTEuNTMzNjcgNC43MDQ5MiwtMS41MzM2NyA2LjY1NDI1LDBsNTAuOTMzNSw0MC4xMjk3NWM2LjQ2NzkyLDUuMDk1NSAxMC4yNDExNywxMi44NzQ5MiAxMC4yNDExNywyMS4xMDk0MnY2OC40MDIyNWMwLDQuOTQ4NTggLTQuMDA5NzUsOC45NTgzMyAtOC45NTgzMyw4Ljk1ODMzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>
                            :
                                <Image width={100} height={100} src="https://img.icons8.com/fluency-systems-regular/96/000000/home.png"/>
                            }
                            <span>{t('common:navbar.main')}</span>
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/search" ? "active" : ""}>
                    <Link href="/search">
                        <a>
                            {router.pathname == "/search" ?
                                <Image width={100} height={100} src="data:image/png;base64,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" />
                            :
                                <Image width={100} height={100} src="https://img.icons8.com/ios-glyphs/120/000000/search--v1.png"/>
                            }
                            <span>{t('common:navbar.search')}</span>
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/following" ? "active" : ""}>
                    <Link href="/following">
                        <a>
                            {router.pathname == "/following" ?
                                <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAwElEQVRYhe2UMQ5BURBFzxMdiUopJNagsQilVq/UKJW2IFFYgMSeRKHQqSQSR/ML5OMT/4t4p5zcmXvnJW8gEvl3wm1BNVfDEK48S3maRSKRLMQ7EMkNtat2vhlgqS6+Zd5Uj+pBrT/Slj9oWgMaQAsYJLPLwFRdAWtgE0LYPxv0Ehd94wzySZZN3gqQ9A7VU4rspI5efdW3UOcpAeb39HlcwmpKrVJkgDawA/pAD9gmtWJQZ158PbWuzgoLEPk5zmA1+t/JEIFAAAAAAElFTkSuQmCC" />
                            :
                                <Image width={100} height={100} src="https://img.icons8.com/windows/32/000000/save-search.png"/>
                            }
                            <span>{t('common:navbar.following')}</span>
                        </a>
                    </Link>
                </li>
            </ul>
            <ul>
                <li className={router.pathname == "/myhosting" ? "active" : ""}>
                    <Link href="/myhosting">
                        <a>
                            {router.pathname == "/myhosting" ?
                                <Image width={100} height={100} src="data:image/png;base64,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" />
                            :
                                <Image width={100} height={100} src="https://img.icons8.com/ios/50/000000/google-play--v1.png"/>
                            }
                            <span>{t('common:navbar.myhosting')}</span>
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/favorites" ? "active" : ""}>
                    <Link href="/favorites">
                        <a>
                            {router.pathname == "/favorites" ?
                                <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABrElEQVRYhe2Xz0sUcRxA32dTQaTVkIJayEsHb0JGYBFeOkW3jt2jW/9ARPWX5DG6C3kQu3rQk6DgQUMU/JFSKCGxr8Pu0jTs5OjuzhzywVxm+H7fY/jMDAOX/O9E1gW1AtwH7gKjwBGwCnyJiNOMNQPANDAOjAAHwBKwGBH1XEVqn/pS3bI9B+o7dTCxZlB937zWjq/qC/XKWfIR9XPGJmlW1dvqmLqWc82sOpwl71cXcm7UYqN5nId5tb9dwJtzbtQJr1veaMqvAZvA1VyD0jnfgbGIOKo0TzwtUA5QBZ4AtAKmCpS3eJgMuFlCwK1kwHEJAfVkwFYJATvJgPUSApbhz2N4HdgG+gqS/wJqEbFbAYiIPWChIDnAfETs/nVGfaDWC3oTPmqbpX4qQP4x876oN2x8OnvFpo15y0a9p570QH6iTuaaEHVa/dFF+bH6OJc8FXHYBfk3s4YuR8QddaUD+Zo6fiF5IqKqzlxA/kGtdiRPhTxT93OID9XnXROnImrq3D/kc2qtJ/JERKiv1J8J8an61sa/RDGoEzYGdEWdKEycihhSh0qRd4vfyk74V5CZQ4sAAAAASUVORK5CYII=" />
                            :
                                <Image width={100} height={100} src="https://img.icons8.com/ios/32/000000/like--v1.png"/>
                            }
                            <span>{t('common:navbar.favorites')}</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;