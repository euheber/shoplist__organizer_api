import {Router} from "express"
import createShopingList from "../controllers/post/createShoppingList.js"
import getShoppingList  from "../controllers/get/shopingList.js"
import { checkSchema } from 'express-validator'
import { createShoplistSchema } from "../schemas/create-shoplist-schema.js"

const router = Router()

router.post("/createlist", checkSchema(createShoplistSchema, ["body"]), createShopingList)
router.get("/shop", getShoppingList)

export default router