import { checkSchema } from 'express-validator'
import  getShoppingList  from "../controllers/get/shopingList.js"
import createShopingList from "../controllers/post/createShoppingList.js"
import { createShoplistSchema } from "../schemas/create-shoplist-schema.js"
import {Router} from "express"

const router = Router()

router.post("/createlist", checkSchema(createShoplistSchema, ["body"]), createShopingList)
router.get("/shop", getShoppingList)

export default router