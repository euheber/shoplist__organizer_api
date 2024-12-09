import { badRequest } from "../../errors/index.js"
import { StatusCodes } from "http-status-codes"
import { validationResult } from "express-validator"
import prisma from "../../lib/prismaClient.js"
import generateToken from "../../utils/generateToken.js"

export default async function createShopingList(req, res, next) {
  const { event_name, owner, items, endsAt } = req.body
  const result = validationResult(req)
  console.log(endsAt)
  if (!result.isEmpty()) {
    const mappedErrors = result.array()
    return next(new badRequest(`${mappedErrors[0].msg}`));
  }

  try {

    const shopList = await prisma.shoplist.create({
      data: {
        endsAt: new Date(endsAt), 
        event_name,
        owner,
        items: { create: [...items] },
      }
    })

    const token = await generateToken({ endsAt, owner, id: shopList.id })
    res.json({ event_name: shopList.event_name, owner: shopList.owner, access: `http://localhost:3000/api/v1/${shopList.event_name.replace(/\s+/g, "")}/${token}` }).status(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    if (e.code === "P2002") {
      return next(new badRequest("Parece que você já tem uma lista cadastrada."))
    }
    return next(new Error(e));
  }
}
