import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


export const authRequired = (req, resp, next) => {
    const { token } = req.cookies;

    if (!token) return resp.status(401).json({ message: "no token" })

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) resp.status(401).json({ message: "invaldio" })
        console.log(decoded);
        next()
    })
}