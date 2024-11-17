import  getShoppingList  from "../controllers/get/shopingList.js"
import createShopingList from "../controllers/post/createShoppingList.js"
import {Router} from "express"


const router = Router()



router.get("/shop", getShoppingList)
router.post("/createlist", createShopingList)

export default router