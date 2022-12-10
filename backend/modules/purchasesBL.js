const Purchase = require("./purchaseSchema");

const getAllPurchases = () => {
  return new Promise((resolve, reject) => {
    Purchase.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getPurchaseById = (id) => {
  return new Promise((resolve, reject) => {
    Purchase.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const addPurchase = (purchase) => {
  return new Promise((resolve, reject) => {
    const newPurchase = new Purchase({
        date: purchase.date,
        products: purchase.products,
        totalPrice: purchase.totalPrice
    });
    newPurchase.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newPurchase);
      }
    });
  });
};

const updatePurchase = (id, purchase) => {
  return new Promise((resolve, reject) => {
    Purchase.findByIdAndUpdate(id, purchase, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(purchase);
      }
    });
  });
};

const deletePurchase = (id) => {
  return new Promise((resolve, reject) => {
    Purchase.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Purchase deleted!");
      }
    });
  });
};

module.exports = {
    getAllPurchases,
    getPurchaseById,
    addPurchase,
    updatePurchase,
    deletePurchase
}