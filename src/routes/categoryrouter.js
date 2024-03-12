import { Router } from "express";
import { addCategoryAndSubcategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";

const router = Router();


router.route("/addCategoryAndSubcategory").post(addCategoryAndSubcategory);
router.route("/getCategories").get(getCategories);
router.route("/updateCategory/:categoryId").put(updateCategory);
router.route("/deleteCategory/:categoryId").delete(deleteCategory);

export default router;