<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Edit Product</h2>
      <label for="title">Title: </label><br />
      <input name="title" type="text" v-model="product.title" /> <br />
      <br />
      <label for="price">Price: </label><br />
      <input name="price" type="number" v-model="product.price" /> <br />
      <br />
      <label for="description">Description: </label><br />
      <input name="description" type="text" v-model="product.description" />
      <br />
      <br />
      <label for="image">Image source: </label><br />
      <textarea name="image" v-model="product.image"></textarea>
      <br />
      <br />
      times purchased: {{ product.purchases }} <br />
      times purchased uniqly: {{ product.uniquePurchases }} <br />

      <button @click="saveAndClose()">Save</button> &nbsp;
      <button @click="closeModal()">Close</button>
    </div>
  </div>
</template>
<script>
import { useProductStore } from "../stores/productToEdit";
const storeProduct = useProductStore();

import { useUrlStore } from "../stores/apiUrl";
const storeUrl = useUrlStore();

export default {
  name: "EditProductModal",
  methods: {
    closeModal() {
      this.product = {};
      this.$emit("close-modal");
    },
    async saveAndClose() {
      if (
        this.product.title &&
        this.product.description &&
        this.product.price &&
        this.product.image
      ) {
        const resp = await fetch(
          `${storeUrl.url}/products/${this.product._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.product),
          }
        );
        this.closeModal();
      } else {
        alert("all fields are required!");
      }
    },
    async getProduct() {
      const resp = await fetch(
        `${storeUrl.url}/products/${storeProduct.product}`
      );
      const data = await resp.json();
      return data;
    },
  },
  data() {
    return {
      product: {},
    };
  },
  async created() {
    this.product = await this.getProduct();
  },
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}
.modal {
  text-align: center;
  background-color: white;
  height: 400px;
  width: 500px;
  margin-top: 10%;
  padding: 30px 0;
  border-radius: 20px;
}
textArea {
  height: 70px;
}
</style>
