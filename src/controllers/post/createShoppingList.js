import { badRequest } from "../../errors/index.js"
import { StatusCodes } from "http-status-codes"
import { validationResult } from "express-validator"
import prisma from "../../lib/prismaClient.js"
import generateToken from "../../utils/generateToken.js"

export default async function createShopingList(req, res, next) {
  const { event_name, owner, items } = req.body
  const result = validationResult(req)

  if (!result.isEmpty()) {
    const mappedErrors = result.array()
    
    return next(new badRequest(`${mappedErrors[0].msg}`));
  }

  try {
    const token = await generateToken({date: "2024-11-28", owner, })
    console.log(token)
    await prisma.shoplist.create({
      data: {
        event_name,
        owner,
        items: { create: [...items] },
        access_link: `http://localhost:5555/shoplist/${token}`
      }
    })

    res.send("Evento cadastrado").status(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    if (e.code === "P2002") {
      return next(new badRequest("Você já possui uma lista cadastrada"))
    }
    return next(new Error(e));
  }
}
