import { DEVELOPMENT } from "../../../actions/types";
import cookie from 'cookie';

export default async (req, res) => {
    if(req.method === "POST") {
        res.setHeader("Set-Cookie", [
            cookie.serialize('access', '', {
                httpOnly: true,
                secure: DEVELOPMENT !== 'DEVELOPMENT',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/api/'
            }),
            cookie.serialize('refresh', '', {
                httpOnly: true,
                secure: DEVELOPMENT !== 'DEVELOPMENT',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/api/'
            })
        ])

        return res.status(200).json({success: "Successfuly logged out"});
    } else {
        res.setHeader("Allow", ["POST"])
        return res.status(405).json({"error": `Method ${req.method} not allowed.`})
    }
}