import { defineStore } from 'pinia'

export const useUrlStore = defineStore({
  id: 'apiUrl',
  state: () => ({
    url: "http://172.31.81.28:3005"
  }),
})
