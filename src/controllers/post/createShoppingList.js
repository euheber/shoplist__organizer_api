import { badRequest } from "../../errors/index.js"
import { StatusCodes } from "http-status-codes"

import prisma from "../../lib/prismaClient.js"
import { validationResult } from "express-validator"

export default async function createShopingList(req, res, next) {
  const { event_name, owner, items } = req.body
  const result = validationResult(req)

  if (!result.isEmpty()) {
    const mappedErrors = result.array()
    
    return next(new badRequest(`${mappedErrors[0].msg}`));
  }

  try {
    await prisma.shoplist.create({
      data: {
        event_name,
        owner,
        items: { create: [...items] },
        access_link: "http://localhost:5555/shoplist/access_token"
      }
    })

    res.send("Evento cadastrado").status(StatusCodes.CREATED)
  } catch (e) {
    if (e.code === "P2002") {
      console.log(e)
      return next(new badRequest("Você já possui uma lista cadastrada"))

    }
    return next(new Error(e));
  }
}
