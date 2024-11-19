import { customErrors } from "../errors/index.js"
import { StatusCodes } from "http-status-codes"


export default function errorHandler(err, req, res, next) {
    if (err instanceof customErrors) {
        return res.status(err.statusCode).send(err.message)
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Ops. Parece que tem algo errado com nossos servidores. Tente novamente mais tarde"})
}