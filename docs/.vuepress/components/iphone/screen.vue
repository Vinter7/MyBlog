<script setup>
import msgbar from './msgbar.vue'
import locked from './locked.vue'
import home from './home.vue'
import { ref } from 'vue'
defineProps(['on', 'unlock'])
let time = ref(Date().slice(16, 21))
setInterval(() => {
  time.value = Date().slice(16, 21)
}, 8000)
</script>

<template>
  <div id="screen">
    <msgbar :on="on" :unlock="unlock">{{ time }}</msgbar>
    <home v-if="unlock"></home>
    <locked v-else>{{ time }}</locked>
  </div>
</template>

<style scoped>
#screen {
  position: relative;
  width: 300px;
  height: 534px;
  background: linear-gradient(#092734, #209888, #e3b788 80%);
}
</style>
