<template>
    <div class="container" :title="productInData.description">
        <img :src="productInData.image" :alt="productInData.title"> <br>
        {{productInData.title}} <br> <br>
        {{`${productInData.price}$`}} <br> <br>
        <button @click="addToCart()">Add to cart</button>
    </div>
</template>
<script>
export default {
    name: "SingleProduct",
    props: {
        product: Object
    },
    methods: {
        addToCart() {
            this.$emit("add-to-cart");
        }
    },
    data() {
        return {
            productInData: {}
        }
    },
    created() {
        this.productInData = this.product
    }
}
</script>
<style scoped>
    img {
        max-height: 100px;
    }
    .container {
        text-align: center;
    }
</style>