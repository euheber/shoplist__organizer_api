import { StatusCodes } from "http-status-codes"
import { badRequest } from "../../errors/index.js"
import { validationResult } from "express-validator"
import prisma from "../../lib/prismaClient.js"

export default async function updateList(req, res, next) {
    const { id, isPurchased } = req.body
    const result = validationResult(req)

    if (!result.isEmpty()) {
      const mappedErrors = result.array()
      return next(new badRequest(`${mappedErrors[0].msg}`));
    }

    try {
        await prisma.item.update({ where: { id }, data: { isPurchased } })

        return res.send("Lista de compras atualizada").status(StatusCodes.ACCEPTED)
    } catch (e) {

        if (e.code === "P2025") {
            return next(new badRequest("Provided ID does not exists in our database."))
        }
        return next(new Error(e))
    }
}