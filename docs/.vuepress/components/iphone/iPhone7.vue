<script setup>
import { ref } from 'vue'
import screen from './screen.vue'
var on = ref(true)
var unlock = ref(false)
const home = () =>
  on.value ? (unlock.value = true) : (on.value = true)

const onoff = () => {
  on.value = !on.value
  unlock.value = false
}
</script>

<template>
  <div id="phone">
    <div id="mute" />
    <div class="voice" />
    <div class="voice" />
    <div id="off" @click="onoff"></div>
    <div id="receiver" />
    <div id="camera">
      <div />
    </div>
    <div id="home" @click="home"><div></div></div>
    <screen id="screen" v-if="on" :on="on" :unlock="unlock"></screen>
  </div>
</template>

<style scoped>
#phone {
  position: relative;
  margin: auto;
  /* div居中 */
  width: 340px;
  height: 694px;
  background: #000;
  border-radius: 46px;
  box-shadow: inset 3px 2px 2px #777,
    1px 1px 5px 3px rgba(0, 0, 0, 0.4);
}
#mute {
  position: absolute;
  left: -3px;
  top: 80px;
  background-color: #000;
  background: radial-gradient(#999, #000 70%);
  border-radius: 10px 0 0 10px;
  width: 3px;
  height: 25px;
}

.voice {
  position: absolute;
  background: #000;
  top: 145px;
  left: -4px;
  border-radius: 11px 0 0 11px;
  width: 4px;
  height: 50px;
  background: radial-gradient(#999, #000 70%);
}
.voice:nth-child(2) {
  top: 210px;
}
#off {
  position: absolute;
  background: #000;
  top: 150px;
  right: -4px;
  border-radius: 0 10px 10px 0;
  width: 4px;
  height: 53px;
  background: radial-gradient(#777, #000 70%);
  cursor: pointer;
  /* 指针样式 */
}
#receiver {
  position: relative;
  background: #444;
  top: 40px;
  margin: auto;
  width: 60px;
  height: 5px;
  border-radius: 5px;
  box-shadow: inset 1px 2px 2px #222;
}
#camera {
  position: absolute;
  background-color: #222;
  width: 10px;
  height: 10px;
  top: 37px;
  left: 110px;
  border-radius: 50%;
  box-shadow: inset 1px 1px 2px #000;
}
#camera div {
  position: absolute;
  width: 7px;
  height: 7px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* 居中大法 */
  background-color: #0d2b69;
  background: radial-gradient(at 40% 40%, #999, #041230 30%);
  box-shadow: 1px 1px 1px #000;
  border-radius: 50%;
  overflow: hidden;
}
#home {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 13px;
  width: 53px;
  height: 53px;
  border-radius: 50%;
  cursor: pointer;
  background: linear-gradient(60deg, #666, #000, #666);
}
#home:active {
  background: linear-gradient(to left top, #666, #000, #666);
}
#home div {
  position: absolute;
  width: 47px;
  height: 47px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #000;
  border-radius: 50%;
}
#screen {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#xyz {
  position: absolute;
  bottom: -100px;
  width: 100%;
  text-align: center;
  font-size: 25px;
}
</style>
