import {badRequest} from "../../errors/index.js"
import prisma from "../../lib/prismaClient.js"
import { StatusCodes } from "http-status-codes"

export default async function createShopingList(req, res, next) {

try {
  await prisma.shoplist.create({data: {
    event_name: "festa de aniversário da claudia",
    owner: "euhbr@hotmail.com",
    acess_code: "#198238ASD7H",
   
  }})

  res.send("Evento cadastrado").status(StatusCodes.CREATED)
} catch(e){ 
   if(e.code === "P2002"){ 
    return next(new badRequest("Você já possui uma lista cadastrada"))
   
   }
   return next(new Error(e));
}}
