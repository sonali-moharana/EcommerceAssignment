
# Ecommerce

This is a Node.js API project for managing categories and subcategories.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Express
- MongoDB (for database)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/sonali-moharana/EcommerceAssignment.git
   ````
2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a .env file in the root directory of the project and specify the following environment variables:

    PORT=8000
    MONGODB_URI=<mongodb-uri>
    CORS_ORIGIN=<cors-origin>

4. Start the server:
    ```bash
    npm run dev
    ```

5. Running Tests
    To run the tests, execute:

    ```bash
    npm test
    ````
    
# API Endpoints
## 1. POST /api/v1/app/addCategoryAndSubcategory
Creates a new category and subcategory.

### Request Body:
```sh
{
  "subcategoryData": {
    "product": "Dresss",
    "items": [
      {
        "name": "Causal Dresses",
        "price": "99.99",
        "color": "Black",
        "size": ["L", "M", "XL"],
        "material": "cotton",
        "image": "path/to/image.jpg"
      }
    ]
  },
  "categoryData": {
    "category": "Women"
  }
}
```
## 2. GET /api/v1/app/getCategories
Retrieves all categories with their subcategories.

## 3. PUT /api/v1/app/updateCategory/:categoryId
Updates an existing category.

### Request Body:

```sh
{
  "category": "Men",
  "subcategories": [
    {
      "product": "Footwear",
      "items": [
        {
          "name": "Branded Shoes",
          "price": 699.99,
          "color": "Black",
          "size": ["8", "9", "10"],
          "material": "Leather",
          "image": "path/to/image.jpg"
        }
      ]
    }
  ]
}
```
## 4. POST /api/v1/app/addSubcategory/:categoryId
Adds a new subcategory to an existing category.

### Request Body:

```sh
{
  "product": "T-Shirts",
  "items": [
    {
      "name": "Causal T-Shirts",
      "price": "799.99",
      "color": "white",
      "size": ["L", "XL", "XXL"],
      "material": "Cotton",
      "image": "path/to/image1.jpg"
    }
  ]
}
```
## 5. GET /api/v1/app/getSubcategoryByCategoryId/:categoryId
Retrieves all subcategories belonging to a specific category.

## 6. PUT /api/v1/app/updateSubcategoryBySubcategoryId/:subcategoryId
Updates an existing subcategory.

### Request Body:

```sh
{
  "product": "Dresss",
  "items": [
    {
      "name": "Causal Dresses",
      "price":  "99.99",
      "color": "Black",
      "size": ["L", "M", "XL"],
      "material": "cotton",
      "image": "path/to/image.jpg"
    }
  ]
}
```
## 7. DELETE /api/v1/app/deleteSubcategoryBySubcategoryId/:subcategoryId
Deletes a subcategory by subcategory ID.