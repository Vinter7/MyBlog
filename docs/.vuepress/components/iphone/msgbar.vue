<script setup>
defineProps(['on', 'unlock'])
</script>

<template>
  <div id="msgbar">
    <div id="signal">
      <div></div>
      <div></div>

      <div></div>
      <div></div>
      <p>中国移动</p>
    </div>
    <div id="topTime" v-if="unlock"><slot></slot></div>
    <div id="quantity">
      <p>75%&nbsp;</p>
      <div id="battery"><div></div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
#msgbar {
  display: flex;
  height: 15px;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 3px;
}
#signal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
}
#signal div {
  width: 5px;
  height: 5px;
  background-color: #fff;
  border-radius: 50%;
}
#signal p {
  color: #fff;
  font-size: 12px;
  line-height: 80%;
}
#topTime {
  width: 80px;
  color: #fff;
  text-align: center;
}
#quantity {
  width: 80px;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#battery {
  position: relative;
  width: 15px;
  height: 8px;
  border: 1px solid #aaa;
  border-radius: 3px;
  margin-right: 1px;
}
#battery div {
  position: absolute;
  left: 1px;
  top: 1px;
  /* transform: translate(0, -50%); */
  width: 10px;
  height: 6px;
  background-color: #fff;
  border-radius: 1px;
}
#battery + div {
  width: 1px;
  height: 3px;
  background-color: #aaa;
}
</style>
