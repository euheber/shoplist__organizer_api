import { StatusCodes } from "http-status-codes"
import prisma from "../../lib/prismaClient.js"

export default async function getShoppingList(req, res) {
    const { id } = req.body

    try {

        const user = await prisma.shoplist.findUnique({
            where: { id },
            include: { items: true }
        })

        res.json({event_name: user.event_name, endsAt: user.endsAt, list: user.items }).status(StatusCodes.ACCEPTED)
    } catch (e) {
        if (e.code === "P2025") {
            return next(new badRequest("Provided ID does not exists in our database."))
        }
    }
  
}