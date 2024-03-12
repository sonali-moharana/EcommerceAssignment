import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subcategory } from "../models/subcategoryModel.js";
import { Category } from "../models/categoryModel.js";

const addCategoryAndSubcategory = asyncHandler(async (req, res) => {
  try {
    const { categoryData, subcategoryData } = req.body;

    // Create new subcategory instance
    const subcategory = new Subcategory(subcategoryData);
    await subcategory.save();

    // Create new category instance and add subcategory reference
    const category = new Category(categoryData);
    category.subcategories.push(subcategory);
    await category.save();
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Category and subcategory created successfully")
      );
  } catch (error) {
    console.error("Error creating category and subcategory:", error);
    throw new ApiError(500, "Internal server error");
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    return res.status(200).json(new ApiResponse(200, { categories }));
  } catch (error) {
    console.error("Error creating category and subcategory:", error);
    throw new ApiError(500, error.message);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      throw new ApiError(404, "Category not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, { updatedCategory }, "Updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      throw new ApiError(404, "Category not found");
    }
    // Also delete subcategories associated with this category
    await Subcategory.deleteMany({ category: categoryId });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  addCategoryAndSubcategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
