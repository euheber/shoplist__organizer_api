import jwt from "jsonwebtoken";
import { badRequest } from "../errors/index.js";

export default function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET, (err, decoded) => {

        if (err) {
           return next(new badRequest("Token invalido ou expirado"))
        }

        req.body.id = decoded.id
        next()
    })
}