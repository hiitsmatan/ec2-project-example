import { defineStore } from 'pinia'

export const useUrlStore = defineStore({
  id: 'apiUrl',
  state: () => ({
    url: "http://34.230.241.108:3005"
  }),
})
