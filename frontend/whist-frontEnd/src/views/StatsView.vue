<template>
  <div class="flex-container">
    <div class="flex-item">
      <h3>Top 5 sold items</h3>
      <div class="inner-container">
        <ul>
          <li v-for="(product, index) in topSales" :key="index">
            {{ product.title }}
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-item">
      <h3>Top 5 unique sold items</h3>
      <div class="inner-container">
        <ul>
          <li v-for="(product, index) in topUnique" :key="index">
            {{ product.title }}
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-item">
      <h3>Past 5 days sales</h3>
      <div class="inner-container">
        <b>{{ lastDays.today }}</b>
        <p>{{ lastSales.todaySales }}$</p>
        <b>{{ lastDays.oneBfr }}</b>
        <p>{{ lastSales.oneBfrSales }}$</p>
        <b>{{ lastDays.twoBfr }}</b>
        <p>{{ lastSales.twoBfrSales }}$</p>
        <b>{{ lastDays.threeBfr }}</b>
        <p>{{ lastSales.threeBfrSales }}$</p>
        <b>{{ lastDays.fourBfr }}</b>
        <p>{{ lastSales.fourBfrSales }}$</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "statsView",
  methods: {
    async getProducts() {
      const resp = await fetch("http://localhost:3005/products");
      const data = await resp.json();
      return data;
    },
    async getPurchases() {
      const resp = await fetch("http://localhost:3005/purchases");
      const data = await resp.json();
      return data;
    },
    getTopSales(products) {
      const highToLow = products.sort((a, b) => {
        return b.purchases - a.purchases;
      });
      const top5 = highToLow.slice(0, 5);
      return top5;
    },
    getTopUnique(products) {
      const highToLow = products.sort((a, b) => {
        return b.uniquePurchases - a.uniquePurchases;
      });
      const top5 = highToLow.slice(0, 5);
      return top5;
    },
    getDates() {
      let today = new Date();
      today = today.toISOString().split("T")[0];
      let oneBfr = new Date();
      oneBfr.setDate(oneBfr.getDate() - 1);
      oneBfr = oneBfr.toISOString().split("T")[0];
      let twoBfr = new Date();
      twoBfr.setDate(twoBfr.getDate() - 2);
      twoBfr = twoBfr.toISOString().split("T")[0];
      let threeBfr = new Date();
      threeBfr.setDate(threeBfr.getDate() - 3);
      threeBfr = threeBfr.toISOString().split("T")[0];
      let fourBfr = new Date();
      fourBfr.setDate(fourBfr.getDate() - 4);
      fourBfr = fourBfr.toISOString().split("T")[0];
      return {
        today,
        oneBfr,
        twoBfr,
        threeBfr,
        fourBfr,
      };
    },
    getPastSales(days, purchases) {
      let todaySales = 0;
      purchases.forEach((p) => {
        if (p.date === days.today) {
          todaySales += p.totalPrice;
        }
      });
      let oneBfrSales = 0;
      purchases.forEach((p) => {
        if (p.date === days.oneBfr) {
          oneBfrSales += p.totalPrice;
        }
      });
      let twoBfrSales = 0;
      purchases.forEach((p) => {
        if (p.date === days.twoBfr) {
          twoBfrSales += p.totalPrice;
        }
      });
      let threeBfrSales = 0;
      purchases.forEach((p) => {
        if (p.date === days.threeBfr) {
          threeBfrSales += p.totalPrice;
        }
      });
      let fourBfrSales = 0;
      purchases.forEach((p) => {
        if (p.date === days.fourBfr) {
          fourBfrSales += p.totalPrice;
        }
      });
      return {
        todaySales,
        oneBfrSales,
        twoBfrSales,
        threeBfrSales,
        fourBfrSales,
      };
    },
  },
  data() {
    return {
      topSales: [],
      topUnique: [],
      lastDays: {},
      lastSales: {},
    };
  },
  async created() {
    this.purchases = await this.getPurchases();
    this.topSales = this.getTopSales(await this.getProducts());
    this.topUnique = this.getTopUnique(await this.getProducts());
    this.lastDays = this.getDates();
    this.lastSales = this.getPastSales(
      this.getDates(),
      await this.getPurchases()
    );
  },
};
</script>
<style>
.flex-container {
  display: flex;
  width: 80%;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
}
.flex-item {
  height: 150px;
  width: 200px;
  margin: 20px;
  text-align: center;
}
.inner-container {
  width: 95%;
  height: 400px;
  border-right: 1px solid black;
  border-left: 1px solid black;
  margin-left: auto;
  margin-right: auto;
}
</style>
