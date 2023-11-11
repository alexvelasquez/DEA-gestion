export default {
    methods: {
        alertSuccess(title,subtitle='') {
            return this.$swal.fire({
                title: title,
                text:subtitle,
                icon: "success",
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick:false,
                confirmButtonColor: '#4D8BA0',
            });
        },
        alertWarning(title,subtitle=null) {
            return this.$swal.fire({
                title: title,
                text:subtitle,
                icon: "info",
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick:false,
                confirmButtonColor: '#4D8BA0',
            });
        },
        alertQuestion(title,subtitle="¿Confirmar?") {
            return this.$swal.fire({
                title: title,
                text:subtitle,
                icon: "question",
                showCancelButton: true,
                allowOutsideClick:false,
                confirmButtonText: 'Si, Confirmar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#4D8BA0',
            });
        },
        alertError(title,subtitle='') {
            return this.$swal.fire({
                title: title,
                text:subtitle,
                icon: "error",
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick:false,
                confirmButtonColor: '#4D8BA0',
            });
        }
    },
}