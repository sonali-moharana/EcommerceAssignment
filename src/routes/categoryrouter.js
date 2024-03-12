import { Router } from "express";
import { addCategoryAndSubcategory, addSubCategory, deleteCategory, getCategories, getSubcategoryByCategoryId, updateCategory, updateSubcategoryBySubcategoryId } from "../controllers/categoryController.js";

const router = Router();


router.route("/addCategoryAndSubcategory").post(addCategoryAndSubcategory);
router.route("/getCategories").get(getCategories);
router.route("/updateCategory/:categoryId").put(updateCategory);
router.route("/deleteCategory/:categoryId").delete(deleteCategory);

router.route("/addSubcategory/:categoryId").post(addSubCategory);
router.route("/getSubcategoryByCategoryId/:categoryId").get(getSubcategoryByCategoryId);
router.route("/updateSubcategoryBySubcategoryId/:subcategoryId").put(updateSubcategoryBySubcategoryId);
router.route("/deleteSubcategoryBySubcategoryId/:subcategoryId").delete(updateSubcategoryBySubcategoryId);

export default router;