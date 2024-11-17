import prisma from "../../lib/prismaClient.js"
import { StatusCodes } from "http-status-codes"

export default async function createShopingList(req, res) {

try {
  await prisma.shoplist.create({data: {
    event_name: "festa",
    owner: "euheber1@hotmail.com",
    acess_code: "#198238ASD7h",
    items: {
      create: [{ item_name: "Bolo", quantity: 1 },
        { item_name: "Refrigerante", quantity: 10 },
        { item_name: "Salgadinhos", quantity: 40 }]
    },
    
  }})

  res.send("Evento cadastrado").status(StatusCodes.CREATED)
} catch(e){ 
   console.log(e);
}}
