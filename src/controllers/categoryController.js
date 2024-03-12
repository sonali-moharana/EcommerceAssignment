import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subcategory } from "../models/subcategoryModel.js";
import { Category } from "../models/categoryModel.js";

//Create category and subcategory
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

//Get all category
const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    return res.status(200).json(new ApiResponse(200, { categories }));
  } catch (error) {
    console.error("Error creating category and subcategory:", error);
    throw new ApiError(500, error.message);
  }
});

//Update a category
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

//Delete a category
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      throw new ApiError(404, "Category not found");
    }
    // Also delete subcategories associated with this category
    await Subcategory.deleteMany({ category: categoryId });
    return res
      .status(200)
      .json(new ApiResponse(200, "Category deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

//Create a subcategory
const addSubCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { product, items } = req.body; // Assuming the request body contains both product details and items
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    const newSubcategory = new Subcategory({
      product,
      items,
    });

    await newSubcategory.save();
    category.subcategories.push(newSubcategory);
    await category.save();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { subcategory: newSubcategory },
          "Subcategory created successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

//Get a subcategory
const getSubcategoryByCategoryId = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).populate(
      "subcategories"
    );
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    res.json(category.subcategories);
    return res
      .status(200)
      .json(new ApiResponse(200, { subcatagories: category.subcategories }));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

// Update a subcategory
const updateSubcategoryBySubcategoryId = asyncHandler(async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      req.body,
      { new: true }
    );
    if (!updatedSubcategory) {
      throw new ApiError(404, "Subcategory not found");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, { updatedSubcategory },"Subcategory updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

//Delete a subcategory
const deleteSubcategoryBySubcategoryId = asyncHandler(async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;

    // Delete subcategory
    const deletedSubcategory = await Subcategory.findByIdAndDelete(
      subcategoryId
    );

    if (!deletedSubcategory) {
      throw new ApiError(404, "Subcategory not found");
    }
    return res
    .status(200)
    .json(new ApiResponse(200,"Subcategory deleted successfully" ));
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    throw new ApiError(500, error.message);
  }
});

export {
  addCategoryAndSubcategory,
  getCategories,
  updateCategory,
  deleteCategory,
  addSubCategory,
  getSubcategoryByCategoryId,
  updateSubcategoryBySubcategoryId,
  deleteSubcategoryBySubcategoryId
};
