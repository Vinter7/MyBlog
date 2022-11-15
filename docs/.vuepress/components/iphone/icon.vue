<script setup>
const props = defineProps(['logo'])
const color = "#888"
</script>


<template>
<div>
  <div id="logo"></div><div id="name"><slot></slot></div>
</div>
</template>


<style scoped>
#whole{
  position: relative;
}
#logo{
  margin: auto;
  width: 48px;
  height: 48px;
  background-color: #777;
  border-radius: 8px;
}
#name{
  font-size: 12px;
  text-align: center;
  color: #fff;
}
</style>