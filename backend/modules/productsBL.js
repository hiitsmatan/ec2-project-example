const Product = require("./productSchema");

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    Product.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    Product.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const addProduct = (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = new Product({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        purchases: 0,
        uniquePurchases: 0
    });
    newProduct.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newProduct);
      }
    });
  });
};

const updateProduct = (id, product) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndUpdate(id, product, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(product);
      }
    });
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Product deleted!");
      }
    });
  });
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}