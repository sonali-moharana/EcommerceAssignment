import axios from 'axios';
import { expect } from 'chai';

describe('POST /api/v1/app/addCategoryAndSubcategory', () => {
  it('should create a category and subcategory', async () => {
    let data = JSON.stringify({
      "subcategoryData": {
        "product": "Dresss",
        "items": [
          {
            "name": "Causal Dresses",
            "price": "99.99",
            "color": "Black",
            "size": [
              "L",
              "M",
              "XL"
            ],
            "material": "cotton",
            "image": "path/to/image.jpg"
          }
        ]
      },
      "categoryData": {
        "category": "Women"
      }
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/app/addCategoryAndSubcategory',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    try {
      const response = await axios.request(config);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('success', true);
      expect(response.data).to.have.property('message', 'Success'); // Adjusted assertion
      console.log(response.data);
    } catch (error) {
      throw new Error(`Failed to create category and subcategory: ${error.message}`);
    }
  });

  it('should get categories successfully', async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/app/getCategories',
      headers: { }
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      expect(response.status).to.equal(200);
    } catch (error) {
      throw new Error(`Failed to get categories: ${error.message}`);
    }
  });

  it('should update a category put /updateCategory/:categoryId', async () => {
    let data = JSON.stringify({
      "category": "Men",
      "subcategories": [
        {
          "product": "Footwear",
          "items": [
            {
              "name": "Branded Shoes",
              "price": 699.99,
              "color": "Black",
              "size": [
                "8",
                "9",
                "10"
              ],
              "material": "Leather",
              "image": "path/to/image.jpg",
              "_id": "65ef4a7292983e5f80d4f872"
            }
          ],
          "_id": "65ef4a7292983e5f80d4f871"
        }
      ]
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/app/updateCategory/65efe9fe8e9adaf15ed47d03',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('success', true);
      expect(response.data).to.have.property('message', 'Updated successfully');
      expect(response.data).to.have.property('data');
      expect(response.data.data).to.have.property('updatedCategory');
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  });

  it('should add a subcategory POST /addSubcategory/:categoryId', async () => {
    let data = JSON.stringify({
      "product": "T-Shirts",
      "items": [
        {
          "name": "Causal T-Shirts",
          "price": "799.99",
          "color": "white",
          "size": [
            "L",
            "XL",
            "XXL"
          ],
          "material": "Cotton",
          "image": "path/to/image1.jpg"
        }
      ]
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/app/addSubcategory/65efe9fe8e9adaf15ed47d03',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
  
    try {
      const response = await axios.request(config);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('success', true);
      expect(response.data).to.have.property('message', 'Subcategory created successfully');
      console.log(response.data);
    } catch (error) {
      throw new Error(`Failed to add subcategory: ${error.message}`);
    }
  });

  it('should get subcategories by category ID /getSubcategoryByCategoryId/:categoryId', async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/app/getSubcategoryByCategoryId/65efe9fe8e9adaf15ed47d03',
      headers: { }
    };

    try {
      const response = await axios.request(config);
      expect(response.status).to.equal(200);
      console.log(JSON.stringify(response.data));
      
    } catch (error) {
      throw new Error(`Failed to get subcategories by category ID: ${error.message}`);
    }
  });

  it('should update a subcategory by subcategory ID', async () => {
    let data = JSON.stringify({"product": "Dresss",
    "items": [
        {
            "name": "Causal Dresses",
            "price":  "99.99",
            "color": "Black",
            "size": [
                "L",
                "M",
                "XL"
            ],
            "material": "cotton",
            "image": "path/to/image.jpg"
            
        }
    ]});
    
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/app/updateSubcategoryBySubcategoryId/65f16796e44fd66ab3eca3b0',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };
    
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('success', true);
      expect(response.data).to.have.property('message', 'Subcategory updated successfully');
      expect(response.data).to.have.property('data');
      
    } catch (error) {
      throw new Error(`Failed to update subcategory by subcategory ID: ${error.message}`);
    }
  });
  
    it('should delete a subcategory by subcategory ID /deleteSubcategoryBySubcategoryId/:subcategoryId', async () => {
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/v1/app/deleteSubcategoryBySubcategoryId/65f17fd3e76ab7442b2f590f',
        headers: {}
      };
  
      try {
        const response = await axios.request(config);
        expect(response.status).to.equal(200);
      } catch (error) {
        throw new Error(`Failed to delete subcategory by subcategory ID: ${error.message}`);
      }
    });
  
});






