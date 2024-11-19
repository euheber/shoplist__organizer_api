import { customErrors } from "./index.js";
import { StatusCodes } from "http-status-codes";

export default class badRequest extends customErrors {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}