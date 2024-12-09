import { StatusCodes } from "http-status-codes"
import prisma from "../../lib/prismaClient.js"

export default async function getShoppingList(req, res) {
    const { id } = req.body

    const user = await prisma.shoplist.findUnique({
        where: { id },
        include: { items: true }
    })
    res.json({ user }).status(StatusCodes.ACCEPTED)
}