import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';

const Header = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user)

    const logoutHandler = () => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(logout())
        }
    }

    return (
        <div className="header">
            <div className="intro-header">
                <div className="prev-next">
                    <Link href="/"><a><Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAACLUlEQVR4nO3dsW6OUQAG4LakEYNEWCTM0hhNBrMEt8DkGtQ9VMsVmFiYGdyBxWYxWEiatBJlEETzGP5Ymmic05xzcnifK3jzDv//v9/3nf9bWoqIiIiIiIg2sIqHeO/PPmITq6PzTgnLeHJIwQdtjs48JawXlAy7ozNPBzewn6Ibwho+F5YMW6OzTwOn8bai5Nc4OTr/FHAMLypK3sb50fmngQcVJX/H1dHZp4HbFSXDndHZp4Er+FZRcn43/y2cw4eKkl/i+Oj8U8AJvKoo+R3Ojs4/BeXz+rcvuDQ6/zRwr6LkfdwcnX0auIafFUXfHZ19GriIvYqSn2J5dP4pyLxuT+Z1HzKv25N53Z7M6/ZkXrcn87o9mdd9yLxuT+Z1ezKv25N53Z7M6z5kXrcn87o9mdftybxuz9Hm9ZnR+aeB+xUl72FtdPapYKew5H9+Xq+MDhBHgI18dHQg15r7kZ93/eAyvlaUnbMmpXCromgywctZnFot9UMuKpXBCp5XlL2NC6PzTwWn8Kai7Fz4L2VxK+tTRdnP5FZWGfU3Z9dHZ5+O8sPy/AfXQ5rAo4qy8wBNKZnp/chM70dmej8y0/uRmd6Ho830PM1UQmZ6PzLT+5GZ3o/M9H5kpvchM70fmen9yEzvR2Z6P+pmeo5olJKZ3o/M9H4s/ta45mBovhxL4br8UXcfymf6zujM08LjgqJzrK6WxetBthz+epBdiwNMeT1IRERERETEQb8AQI9MkNdQ/5EAAAAASUVORK5CYII="/></a></Link>
                    <Link href="/"><a><Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAACK0lEQVR4nO3dvY6MUQAG4FkriEIi0Uj0slFqKNQS3AKVa7AuYFV+r0CDQtQU7kCj0yg0JIq18VMIicmjGDo/e05yzsnZvE8/mTdvJpnv/ebMzGIRERERERERiwUO4g4++Lu32ML+0Xmn9avk3Xo4Ou+0/vNK/pPN0ZmnVFH0EhdG554O7hYWDZ+wMTr7VHAILyrKfoNjo/NPBcfxrqLs53IlUgan8bWi7Nujs08HlyuKhqujs09H2XX1b99xbnT2qWAdTyvKfo8To/NPBUfwqqLslzg8Ov9UcBIfK8p+grXR+aeC8/hRUXZmeilsVhS9xKXR2aeD+xVlf8Gp0dmnIjO9H5np/chM70dmej8y0/uQmd6PzPR+ZKb3IzO9H5np/chM70Nmej8y0/vBGXyrKDszvZTM9H5kpvchM70fHMXrirIz00thw+r0aambo7NPR91M326da1/rJ5jEsvUT7KmirQ6sP14sFuuFD33QIM7eJG+G7cnlXR/qvhuTwVICVypKJhN893BWbiq1JbdJ25Mb/+1hDY8qSs5HWSVwvaLkfDhbQv1xg2ujs0/D6gBNzZ25HKDZLZnX7VnN62cVJWdel5B53Z7M6/ZkXrcn87o9mdftybzuQ+Z1ezKv25N53Z7M6/ZkXvch87o9mdftybxuT+Z1ezKv+8C9ipI/y88al8FOYclLXBydezry0/N9KPwzBZnXdXAAt7D9j4J3cEOuMCIiIiIiIvr4CXbVF6Hhr504AAAAAElFTkSuQmCC"/></a></Link>
                </div>
                <div className="account">
                    {!isAuthenticated ? 
                        <React.Fragment>
                            <Link href="https://dashboard.abaystreet.com/accounts/register">
                                <a target="_blank" className="register">Регистрация</a>
                            </Link>
                            <Link href="/accounts/login">
                                <a className="login">Вход</a>
                            </Link>
                        </React.Fragment>    
                    : 
                        <React.Fragment>
                            <Link href={user !== null ? `/profile/${encodeURIComponent(user.brandname)}`: "/"}>
                                <a className="user">
                                    <Image width={100} height={100} src="data:image/png;base64,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"/>
                                    <span>{user !== null && user.brandname}</span>
                                </a>
                            </Link>
                            <span className="logout" onClick={logoutHandler}>
                                <Image width={100} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAADl0lEQVR4nO3dTW9MYRjG8euZtBJha6P9CEiwEBESbxsqxLrL1sbGjqWtjS2J2OATeNn4ADShlSBiTyIWFpSmSFwW85TpSec4L/c95+64/suTc567eX6ZF53TkZAjuQXABQCzAHYB2AY12DcArwDcA3ArpfTDY0gCAJI7ATwEsNdjyBi2BGAmpfTBeuGUHxkLEEbdFgEcTCn9tFy0h/7TlDDqtx/AnPmqJBe4vvv5KUwNRHKK5IPCXj3xGLRcGDJlPmRMIjld2Ksv1jMSSa47kFKyHjJOee9Xz3Ix1T6BBEsgwRJIsAQSLIEESyDBEkiwBBIsgQRLIMESSP2uuK5e+O0l/32FInnZbb8E0qw1FOt1J6wX/F9KKV0judV8XX0eEiu9qAdLIMESSLAEUjGSu0k+JvmI5D7PQXrbWyGSSwPbtEzysNcggVSI5LvCVvmgCKRaJOeLe5VRjlgPEkjFSF4i+auwZd9IHrUcIpAalaAcsxogkJq5ogikWW4oAmmeC4pA2lWCcrzpggJpmSmKQGwyQxGIXSUoJ+osIhDDhqCsVEYRiH2tUATiU2MUgfg1BGWV5OmyiwTiWG0UgfhXC0Ugo6kEZaZ4okBGVCUUgYy2ISjfSZ4BAty5SHIWwHUAO0Y5N2CrAM51CkJyEsBnAOb3yG7SVrq+L6sHQE+TA3UKklL6DmAewMcuf44grQI4rxf1EZdf1Iv9faclkNH1T4x8kkBGUAnG6eKJAnGuMkY+WSCODcFYIXly2AUCcaoEY/hnIgLxqRFGvlAgxjXGyBcLxLAhGNXvPBGIXSUY1e/NEohNJhh5IYG0rASj/k3XAmmXKUZeUCANM8fIiwqkQS4YeWGB1MwNIy8ukBqVYNj8Ja5AqueOkYcIpEIkL26AoS8O6CKSk/mRUMTQV2t0EckeyU/uGHmYQCpE8hTJtyRfkDzoNafzOxfV+rq+UU4VEkiwBBIsgbSI5FWPRfUuq0Ekr7rsl0Dqt4YhkAANYnjsl/4dUjPv/dKLerAEEiyBBEsgwRJIsAQSLIEESyDBEkiwBBIsgQSrB2B58ADJ6Y5+lvBtsDfLG57Yoh6AN4VjN0hOWQ/a7GWMm4XDr63nTAC4C+DAwLEZAO/1m/hK3bFeMJHcAuApAL//Cm48ewbgUErpp+WivZTSD/QfFYuWC495zwGctcYAgD8frrD/7W5zAGYB7AGw3XrYJu8rgJfoP8Xf9sAAgN8+B2HqUfi1FAAAAABJRU5ErkJggg==" />
                            </span>
                        </React.Fragment>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;