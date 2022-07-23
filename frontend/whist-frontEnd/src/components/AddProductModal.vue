<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Add Product</h2>
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

      <button @click="saveAndClose()">Save</button> &nbsp;
      <button @click="closeModal()">Close</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddProductModal",
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    async saveAndClose() {
      if (
        this.product.title &&
        this.product.description &&
        this.product.price &&
        this.product.image
      ) {
        const resp = await fetch(`http://localhost:3005/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.product),
        });
        this.$emit("re-fetch");
        this.closeModal();
      } else {
        alert("all fields are required!");
      }
    },
  },
  data() {
    return {
      product: {},
    };
  },
  created() {
    this.product = this.product;
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
