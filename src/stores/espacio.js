import { defineStore } from 'pinia'
import http from '../plugins/axios'

export const useEspacioStore = defineStore('espacio', {
    state: () => ({
        espacioObligado: null,
        menu: [
            {
                id: "ENTIDAD-SEDE",
                name: "ENTIDAD/SEDE",
                icon: "mdi-office-building-marker",
                to: {
                    name: "entidad-sede",
                },
            },
        ],
    }),
    getters: {
        menuValidacionDEA() {
            return [{
                id: "DEAS",
                name: "DEAS",
                icon: "mdi-heart-pulse",
                to: {
                    name: "deas",
                },
            }]
        },
        menuValidacionDDJJ() {
            return [{
                id: "DDJJ",
                name: "CONDICIONES",
                icon: "mdi-file-sign",
                to: {
                    name: "ddjj",
                },
                validacion: "ddjj",
            },
            {
                id: "MUERTES-SUBITAS",
                name: "MUERTES SÚBITAS",
                icon: "mdi-account-minus",
                to: {
                    name: "muertes-subita",
                },
                validacion: "ddjj",
            },]
        },
    },
    actions: {
        async updateEspacioObligado(espacio) {
            try {
                const {
                    data: { data: espacio_obligado },
                } = await http(`/espacios_obligados/${espacio}/`);
                this.espacioObligado = { ...espacio_obligado }
            } catch (error) {
                console.log(error);
            }
        }
    }
})