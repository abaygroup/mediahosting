import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const FootBar = () => {
    const router = useRouter();

    return (
        <div className="footbar">
            <ul>
                <li className={router.pathname == "/" ? "active" : ""}>
                    <Link href="/">
                        <a>
                            {router.pathname == '/' ?
                            <Image width={100} height={100} alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTQ0IiBoZWlnaHQ9IjE0NCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMTQxLjU0MTY3LDE1NC4wODMzM2gtMzIuMjVjLTQuOTQ4NTgsMCAtOC45NTgzMywtNC4wMDk3NSAtOC45NTgzMywtOC45NTgzM3YtMzIuMjVjMCwtMy45NTk1OCAtMy4yMDcwOCwtNy4xNjY2NyAtNy4xNjY2NywtNy4xNjY2N2gtMTQuMzMzMzNjLTMuOTU5NTgsMCAtNy4xNjY2NywzLjIwNzA4IC03LjE2NjY3LDcuMTY2Njd2MzIuMjVjMCw0Ljk0ODU4IC00LjAwOTc1LDguOTU4MzMgLTguOTU4MzMsOC45NTgzM2gtMzIuMjVjLTQuOTQ4NTgsMCAtOC45NTgzMywtNC4wMDk3NSAtOC45NTgzMywtOC45NTgzM3YtNjguMzk1MDhjMCwtOC4yMzgwOCAzLjc3NjgzLC0xNi4wMjEwOCAxMC4yNDQ3NSwtMjEuMTE2NThsNTAuOTI2MzMsLTQwLjEyOTc1YzEuOTUyOTIsLTEuNTMzNjcgNC43MDQ5MiwtMS41MzM2NyA2LjY1NDI1LDBsNTAuOTMzNSw0MC4xMjk3NWM2LjQ2NzkyLDUuMDk1NSAxMC4yNDExNywxMi44NzQ5MiAxMC4yNDExNywyMS4xMDk0MnY2OC40MDIyNWMwLDQuOTQ4NTggLTQuMDA5NzUsOC45NTgzMyAtOC45NTgzMyw4Ljk1ODMzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>
                            :
                            <Image width={100} height={100} src="data:image/png;base64,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" />}
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/search" ? "active" : ""}>
                    <Link href="/search">
                        <a>
                            <Image width={100} height={100} src="data:image/png;base64,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" />
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/following" ? "active" : ""}>
                    <Link href="/following">
                        <a>
                            <Image width={100} height={100} src="data:image/png;base64,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" />
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/myhosting" ? "active" : ""}>
                    <Link href="/myhosting">
                        <a>
                        <Image width={100} height={100} src="data:image/png;base64,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" />
                        </a>
                    </Link>
                </li>
                <li className={router.pathname == "/favorites" ? "active" : ""}>
                    <Link href="/favorites">
                        <a>
                            <Image width={100} height={100} src="data:image/png;base64,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" />
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default FootBar;