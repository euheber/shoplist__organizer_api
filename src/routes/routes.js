import {Router} from "express"
import createShopingList from "../controllers/post/createShoppingList.js"
import getShoppingList  from "../controllers/get/shopingList.js"
import updateList from "../controllers/patch/updateShoppingList.js"
import { checkSchema } from 'express-validator'
import { createShoplistSchema } from "../schemas/create-shoplist-schema.js"
import { updateItemSchema } from "../schemas/update-item-schema.js"

const router = Router()

router.post("/createlist", checkSchema(createShoplistSchema, ["body"]), createShopingList)
router.patch("/updatelist", checkSchema(updateItemSchema, ["body"]), updateList)
router.get("/shop", getShoppingList)

export default router