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
      .json( new ApiResponse(200, "Category and subcategory created successfully" ));
    } catch (error) {
      console.error("Error creating category and subcategory:", error);
      throw new ApiError(500,"Internal server error" );
    }
  });

  export {addCategoryAndSubcategory};