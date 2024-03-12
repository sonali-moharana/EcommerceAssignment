import { Router } from "express";
import { addCategoryAndSubcategory } from "../controllers/categoryController.js";

const router = Router();


router.route("/addCategoryAndSubcategory").post(addCategoryAndSubcategory);
export default router;