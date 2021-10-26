import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';

const Header = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user)

    const logoutHandler = () => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(logout())
        }
    }

    // const [top, setTop] = useState(true);

    // useEffect(() => {
    //     const scrollHandler = () => {
    //         window.pageYOffset > 100 ? setTop(false) : setTop(true)
    //     };

    //     window.addEventListener('scroll', scrollHandler);
    //     scrollHandler();

    //     return () => {
    //         window.removeEventListener('scroll', scrollHandler);
    //     }
        
    // }, [top]);


    return (
        <div className="header">
            <div className="intro-header">
                <div className="prev-next">
                    <Link href="/"><a><Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACzElEQVR4nO3dMWiUZxwG8ERbFSliKRQEUal0cSjYsUhwkEAcDI04OHWKi0uhS1fdujm5lC4uTu3iUDp0cHHooODgoCBJGhAEUdC0aU3665ADk/O9MXnCe/8f3HwPTyCX+77nezMxUbbALJbxJ2bSecbKoPx/vbOUzjQ2MI1VWy2kc40FTGFlqPw1fJ3O1j2cxsuh8v/DfDpb9/AFXnjfd+ls3cPneNYo//t0tu7hGBYa5V9LZ+sejuJpo/wb6Wzdw6d41Cj/J0ym83UNh3G/Uf4t7Enn6xoO4Y9G+T/jg3S+ruEg7jbK/w370/m6hn34tVH+7ziQztc1fIg7jfLv4aN0vq5hL243yn+Aj9P5uoZJ/Ngo/yE+Sefr2qD8m43yH+NIOl/38EOj/EUcT2frHq43yl/GZ+ls3cO3jfKf41Q6W/dwtVH+K3yZztY9fIP1ofLf4Ew6W/dwEW+Hyv8LZ9PZuocLts5H4B+cT2frHs7h76Hy13Apna17+Aqvh8pfx+V0tu4ZPR+5ks7WPTUfyVHzkRw1H8lR85EcNR/JUfORHKPnI7+o+cj2UvORHDUfyVHzkRw1H8lR85Eco+cjT9R8ZPtpz0eWcCKdrXtGz0dOprN1T81HctR8JEfNR3IwZ+Om+WYrmEpnGwuDD9jNVjGdzrVb7MTlXTvwHmWU+hW0C9SH8C5Qf4buAuqLWJ66FJGnLsZlqcvReeqGTJ66JZmnbsrnqVlKnhpm5alpYp4a5+apeXqeekAjTz2ilKce0stTj6nmqQe189RRBXnqsI48dVxNnjqwKU/NXfLU3CVPzV3y1MGteero4ix1eHeemrvkqblLnpq75Km5S56au+Spf+SWp+YueWrukqfmLnlq7pKn5i55au6SZ/TcZT6dbWxgysbxCZutYS6dbWxg2sZJLpstpnONFczaOndZSmcaO4MfwtLgNbPd7/c/4cALHqzZgaAAAAAASUVORK5CYII="/></a></Link>
                    <Link href="/"><a><Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACq0lEQVR4nO3dv6uVdQAGcE37QUgUQRBEgoNDQ0ODQ8OlIS7YoHCjocnJyUVoabXNzcnFWlycmhqioaGlocGgoaEhSAVBCCrxR3r103COcHj70nZ9gu/z+QfOw3ku997zvs/7Pfv27TEcx3XcwMm9fr1aWL/xTzxoCU/Z+qd/031sp3NNAzvYXZRwB1vpbNPAKTxalPAnjqWzTQNn/NsfeCedbRo4OyjhFt5KZ5sGPhuUcANH0tmmgfODEn7D4XS2KWA/Lg5K+AWvp/NNYV3CpUEJP+HVdL4p4ACuDEr4Ea+k800Bz+KrQQnf41A63xTwHL4elPAtXkjnmwJexHeDEr7B8+l8U8BL+GFQwpc4mM43BbyMq4MSLuOZdL4p4DX8PCjhC+xP55sC3sCvgxIupLNNA29aXaJYOpfONg0cxc1BCZ+ms00Db+P3QQmfpLNNA8fw16KAxzidzjYNvIvbixJ28XE62zTwPu4NSvgonW0aOGG1Mdr0Nz5IZ5sGPsTDRQl38V462zR07pKnc5c8nbvk6dwlT+cuWTp3yVuX8PmghM5dnhadu+Tp3CVP5y55OnfJ07lLns5d8nTukqdzlzydu+Tp3CVP5y55OnfJw5bV8QmbdrGTzjYNbFsdJLLp2l6/bj+A/DfpAFPor6Cg/hEO6r+hQfpBLEcvReToxbgcvRydozdkcvSWZI7elM/RWUqODrNydJqYo+PcHJ2nZ+kDGjn6iFKOPqSXo4+p5uiD2jl6VEGOHtaRo8fV5OiBTTk6H8nR+UiOzkdydD6So/ORHJ2P5Oh8JEfnIzk6H8nR+UiOzkdydD6So19lmKPzkSydj+TofCRH5yM5Oh/J0flIDnas7ttuuoOtdLYp4Prizb+P7XSuaSwKeICT6UxTwfF1CddwIp3n/+YfPYoLHYmOanUAAAAASUVORK5CYII="/></a></Link>
                </div>
                <div className="logo">
                    <Link href={"/"}>
                        <a>
                            <Image src="/icons/logo.png" width={5276} height={730} />
                        </a>
                    </Link>
                </div>
                <div className="account">
                    {!isAuthenticated ? 
                        <React.Fragment>
                            <Link href="/accounts/register">
                                <a className="register">Регистрация</a>
                            </Link>
                            <Link href="/accounts/login">
                                <a className="login">Вход</a>
                            </Link>
                        </React.Fragment>    
                    : 
                        <React.Fragment>
                            <Link href={user !== null ? `/profile/${encodeURIComponent(user.username)}`: "/"}>
                                <a className="user">
                                    <Image width={100} height={100} src="data:image/png;base64,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"/>
                                    <span>{user !== null && user.username}</span>
                                </a>
                            </Link>
                            <span className="logout" onClick={logoutHandler}>
                                <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAADl0lEQVR4nO3dTW9MYRjG8euZtBJha6P9CEiwEBESbxsqxLrL1sbGjqWtjS2J2OATeNn4ADShlSBiTyIWFpSmSFwW85TpSec4L/c95+64/suTc567eX6ZF53TkZAjuQXABQCzAHYB2AY12DcArwDcA3ArpfTDY0gCAJI7ATwEsNdjyBi2BGAmpfTBeuGUHxkLEEbdFgEcTCn9tFy0h/7TlDDqtx/AnPmqJBe4vvv5KUwNRHKK5IPCXj3xGLRcGDJlPmRMIjld2Ksv1jMSSa47kFKyHjJOee9Xz3Ix1T6BBEsgwRJIsAQSLIEESyDBEkiwBBIsgQRLIMESSP2uuK5e+O0l/32FInnZbb8E0qw1FOt1J6wX/F9KKV0judV8XX0eEiu9qAdLIMESSLAEUjGSu0k+JvmI5D7PQXrbWyGSSwPbtEzysNcggVSI5LvCVvmgCKRaJOeLe5VRjlgPEkjFSF4i+auwZd9IHrUcIpAalaAcsxogkJq5ogikWW4oAmmeC4pA2lWCcrzpggJpmSmKQGwyQxGIXSUoJ+osIhDDhqCsVEYRiH2tUATiU2MUgfg1BGWV5OmyiwTiWG0UgfhXC0Ugo6kEZaZ4okBGVCUUgYy2ISjfSZ4BAty5SHIWwHUAO0Y5N2CrAM51CkJyEsBnAOb3yG7SVrq+L6sHQE+TA3UKklL6DmAewMcuf44grQI4rxf1EZdf1Iv9faclkNH1T4x8kkBGUAnG6eKJAnGuMkY+WSCODcFYIXly2AUCcaoEY/hnIgLxqRFGvlAgxjXGyBcLxLAhGNXvPBGIXSUY1e/NEohNJhh5IYG0rASj/k3XAmmXKUZeUCANM8fIiwqkQS4YeWGB1MwNIy8ukBqVYNj8Ja5AqueOkYcIpEIkL26AoS8O6CKSk/mRUMTQV2t0EckeyU/uGHmYQCpE8hTJtyRfkDzoNafzOxfV+rq+UU4VEkiwBBIsgbSI5FWPRfUuq0Ekr7rsl0Dqt4YhkAANYnjsl/4dUjPv/dKLerAEEiyBBEsgwRJIsAQSLIEESyDBEkiwBBIsgQSrB2B58ADJ6Y5+lvBtsDfLG57Yoh6AN4VjN0hOWQ/a7GWMm4XDr63nTAC4C+DAwLEZAO/1m/hK3bFeMJHcAuApAL//Cm48ewbgUErpp+WivZTSD/QfFYuWC495zwGctcYAgD8frrD/7W5zAGYB7AGw3XrYJu8rgJfoP8Xf9sAAgN8+B2HqUfi1FAAAAABJRU5ErkJggg==" />
                            </span>
                        </React.Fragment>
                    }
                </div>

                {/* Setting */}
                <div className="setting-link">
                    <Link href={"/setting"}>
                        <a>
                            <Image width={100} height={100} src="data:image/png;base64,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" />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;