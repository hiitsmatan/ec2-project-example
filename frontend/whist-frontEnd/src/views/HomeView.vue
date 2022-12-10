<template>
  <div>
    <button class="cart-btn" @click="openCart()">
      {{ `cart (${totalAmount})` }}
    </button>
    <div class="main-container">
      <div class="grid-container">
        <div
          class="grid-item"
          :key="index"
          v-for="(product, index) in products"
        >
          <SingleProduct :product="product" @add-to-cart="addToCart(product)" />
        </div>
      </div>
      <div class="cart" v-show="showCart">
        <table>
          <tr>
            <th>product</th>
            <th>amount</th>
            <th>price</th>
            <th>total price</th>
            <th></th>
          </tr>
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ item.product.title }}</td>
            <td>
              <input
                type="number"
                v-model="item.amount"
                class="num-input"
                @change="calcAmontAndPrice"
              />
            </td>
            <td>{{ `${item.product.price}$` }}</td>
            <td>{{ `${item.product.price * item.amount}$` }}</td>
          </tr>
        </table>
        <h3>total price: {{ totalPrice }} $</h3>
        <button @click="clearCart()">clear cart</button>
        <button @click="purchase()">Buy</button>
      </div>
    </div>
  </div>
</template>
<script>
import { useUrlStore } from '../stores/apiUrl';
import SingleProduct from "../components/SingleProduct.vue";
export default {
  name: "HomeView",
  components: { SingleProduct },
  methods: {
    async getProducts() {
      const resp = await fetch(`${useUrlStore().url}/products`);
      const data = await resp.json();
      return data;
    },
    calcTotalAmount() {
      let totalAmount = 0;
      this.cart.forEach((item) => {
        totalAmount += item.amount;
      });
      this.totalAmount = totalAmount;
    },
    calcTotalPrice() {
      let totalPrice = 0;
      this.cart.forEach((item) => {
        totalPrice += item.product.price * item.amount;
      });
      this.totalPrice = totalPrice;
    },
    calcAmontAndPrice() {
      this.calcTotalAmount();
      this.calcTotalPrice();
    },
    addToCart(product) {
      let itemIsInCart = false;
      this.cart.forEach((productObj) => {
        if (productObj.product._id == product._id) {
          itemIsInCart = true;
        }
      });
      if (itemIsInCart) {
        this.cart.forEach((productObj) => {
          if (productObj.product._id == product._id) {
            productObj.amount++;
          }
        });
      } else {
        const newProductObj = {
          product: product,
          amount: 1,
        };
        this.cart = [...this.cart, newProductObj];
      }
      this.calcAmontAndPrice();
    },
    openCart() {
      this.showCart = !this.showCart;
    },
    clearCart() {
      this.cart = [];
      this.totalAmount = 0;
      this.totalPrice = 0;
    },
    async purchase() {
      const newCart = this.cart.map((item) => {
        return {
          productId: item.product._id,
          amount: item.amount,
        };
      });
      let today = new Date();
      today = today.toISOString().split("T")[0];
      const invoce = {
        products: newCart,
        date: today,
        totalPrice: this.totalPrice
      };
      const purchaseResp = await fetch(`${useUrlStore().url}/purchases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoce),
      });

      this.products.forEach((product) => {
        let amount = 0
        let newProduct;
        let itemIsInCart = false;
        this.cart.forEach((item) => {
          if (item.product._id == product._id) {
            itemIsInCart = true;
            amount = item.amount;
          }
        });
        if (itemIsInCart) {
          newProduct = {
            ...product,
            uniquePurchases: product.uniquePurchases + 1,
            purchases: product.purchases + amount,
          };
        } else {
            newProduct = {...product}
        }
        fetch(`${useUrlStore().url}/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      }
        )
      });
      this.clearCart()
      this.products = await this.getProducts();
    },
  },
  data() {
    return {
      products: [],
      cart: [],
      totalAmount: 0,
      totalPrice: 0,
      showCart: false,
    };
  },
  async created() {
    this.products = await this.getProducts();
  },
};
</script>
<style scoped>
.grid-container {
  margin-right: auto;
  margin-left: auto;
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 230px;
}
.grid-item {
  border: 1px solid black;
  margin: 5px;
}
.main-container {
  display: flex;
}
.cart-btn {
  margin-left: 80%;
}
.cart {
  border: 1px solid black;
}
.num-input {
  width: 30px;
}
</style>
