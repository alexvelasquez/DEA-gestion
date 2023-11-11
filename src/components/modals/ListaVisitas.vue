<template>
    <v-card>
      <v-alert
        height="10"
        class="text-fourth"
        border="start"
        border-color="fourth"
      >
        <strong> LISTADO VISITAS EN {{ espacio.nombre }} </strong>
      </v-alert>
      <div v-for="(visita, i) in visitas" :key="i">
            <v-divider v-if="i == 0"></v-divider>
            <v-list-item>
                <template v-slot:title>
                    {{
                      $moment(visita.fecha).format(
                        "DD/MM/YYYY"
                      )
                    }}
                    <v-chip
                    :color="colorEstado[visita.resultado]"
                    class="ma-2"
                    label
                    size="small"
                    >{{ visita.resultado }}</v-chip>
                </template>
                <template v-slot:subtitle>
                    <div>
                        <p class="text-primary">Observacione: {{ visita.observaciones }}</p>
                    </div>
                </template>
            </v-list-item>
            <v-divider></v-divider>
        </div>
      <v-divider></v-divider>
      <v-card-actions class="justify-center">
        <v-btn color="primary" variant="tonal" @click="$emit('close')"
          >CERRAR</v-btn
        >
      </v-card-actions>
    </v-card>
  </template>
  <script>

  export default {
    props: ["visitas", "espacio"],
    data() {
      return {
        colorEstado:{
            "Aprobado" : "success",
            "Rechazado": "error",
            "Dado de baja": "warning"
        }
      };
    },
    methods: {
    },
  };
  </script>
  