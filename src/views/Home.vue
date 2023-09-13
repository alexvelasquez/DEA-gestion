<template>
  <div>
    <v-btn @click="sumar()"> Button {{ count }}</v-btn>
  </div>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);

const sumar = () => {
  count.value++;
};
</script>
