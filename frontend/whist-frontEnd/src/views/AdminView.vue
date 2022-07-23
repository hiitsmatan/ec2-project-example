<template lang="">
  <div>
    <div class="container">
      <table border="1">
        <tr>
          <th>Product &nbsp; <button @click="toggleAdd">Add</button></th>
          <th>Title</th>
          <th>Price</th>
          <th>Options</th>
        </tr>
        <tr v-for="product in products" :title="product.description">
          <td><img :src="product.image" :alt="product.title" /></td>
          <td>{{ product.title }}</td>
          <td>{{ `${product.price}$` }}</td>
          <td>
            <button @click="toggleEdit(product._id)">edit</button> &nbsp;
            <button @click="deleteProduct(product._id)">delete</button>
            <EditProductModal
              v-if="editProduct"
              :productId="product._id"
              @close-modal="toggleEdit"
            />
            <AddProductModal v-if="addProduct" @close-modal="toggleAdd" @re-fetch="reFetch()" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import EditProductModal from "../components/EditProductModal.vue";
import AddProductModal from "../components/AddProductModal.vue";

import { useProductStore } from "../stores/productToEdit";
const storeProduct = useProductStore()
export default {
  name: "adminView",
  components: { EditProductModal, AddProductModal },
  methods: {
    async reFetch() {
        this.products = await this.getProducts();
    },
    async getProducts() {
      const resp = await fetch("http://localhost:3005/products");
      const data = await resp.json();
      return data;
    },
    toggleEdit(id) {
      this.editProduct = !this.editProduct;
      storeProduct.setProduct(id);
    },
    toggleAdd() {
      this.addProduct = !this.addProduct;
    },
    async deleteProduct(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        const resp = await fetch(`http://localhost:3005/products/${id}`, {
          method: "DELETE",
        });
        if (!resp.ok) {
          alert("could not delete!");
        }
        this.reFetch()
      }
    },
  },
  data() {
    return {
      products: [],
      editProduct: false,
      addProduct: false,
    };
  },
  async created() {
    this.products = await this.getProducts();
  },
};
</script>

<style>
img {
  height: 150px;
}
td {
  width: 180px;
  text-align: center;
}
table {
  margin-left: auto;
  margin-right: auto;
}
</style>
