import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        rol: 'REPRESENTANTE',
        menuUser: []
    }),
})