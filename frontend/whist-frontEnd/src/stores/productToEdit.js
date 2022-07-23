import { defineStore } from 'pinia'

export const useProductStore = defineStore({
  id: 'productToEdit',
  state: () => ({
    product: ""
  }),
  actions: {
    setProduct(product) {
      this.product = product
    }
  }
})
