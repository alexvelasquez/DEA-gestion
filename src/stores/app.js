import { defineStore } from 'pinia'


export const useAppStore = defineStore('app', {
    state: () => ({
        user: null,
        loadingApp:false,
        menuUser: []
    }),
    getters: {
        rol() {
            const roles = {
                "administrador_provincial": "Administrador Provincial",
                "representante": "Representante",
                "certificador": "CERTIFICADOR"
            }
            return this.user ? roles[this.user.rol] : null
        }
    },
    persist: [
        {
            paths: ['user'],
            storage: localStorage,
        },
    ]
})