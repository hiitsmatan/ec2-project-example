import { defineStore } from 'pinia'

export const useUrlStore = defineStore({
  id: 'apiUrl',
  state: () => ({
    url: "http://54.89.141.36:3005"
  }),
})
