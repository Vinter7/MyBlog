<script setup>
function play(key) {
  if (audios[key]) {
    au = audios[key]
    au.currentTime = 0
    au.play()
  } else {
    console.log('请输入正确的音键')
  }
}

let url =
  'https://haveyouwantto.github.io/WindsongLyre-Sim/instruments/windsong_lyre/audio/'

const audios = {
  d: new Audio(url + '1.mp3'),
  f: new Audio(url + '2.mp3'),
  g: new Audio(url + '3.mp3'),
  h: new Audio(url + '4.mp3'),
  j: new Audio(url + '5.mp3'),
  k: new Audio(url + '6.mp3'),
  q: new Audio(url + '6.mp3'),
  l: new Audio(url + '7.mp3'),
  w: new Audio(url + '7.mp3'),

  e: new Audio(url + '1+.mp3'),
  r: new Audio(url + '2+.mp3'),
  t: new Audio(url + '3+.mp3'),
  y: new Audio(url + '4+.mp3'),
  u: new Audio(url + '5+.mp3'),
  i: new Audio(url + '6+.mp3'),
  o: new Audio(url + '7+.mp3'),
  p: new Audio(url + '7+.mp3'),

  z: new Audio(url + '1-.mp3'),
  x: new Audio(url + '2-.mp3'),
  c: new Audio(url + '3-.mp3'),
  v: new Audio(url + '4-.mp3'),
  b: new Audio(url + '5-.mp3'),
  n: new Audio(url + '6-.mp3'),
  a: new Audio(url + '6-.mp3'),
  m: new Audio(url + '7-.mp3'),
  s: new Audio(url + '7-.mp3'),
}

function mouse(i, j) {
  play(list[i][j - 1])
}

let au
let list = [
  ['e', 'r', 't', 'y', 'u', 'i', 'o'],
  ['d', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]
document.addEventListener('keydown', event => {
  console.log(event.key)
  play(event.key)
  // event.stopPropagation()
})
</script>

<template>
  <div class="flexbox" v-for="(i, index) in ['+', '', '-']">
    <button class="btn" v-for="j in 7" @click="mouse(index, j)">
      {{ i + j }}
    </button>
  </div>
</template>

<style scoped>
.flexbox {
  display: flex;
  /* background-color: skyblue; */
  justify-content: space-between;
  margin: 30px 0;
}
.btn {
  background-color: var(--c-brand);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 20%;
  font-size: large;
}
.btn:hover {
  background-color: var(--c-brand-light);
}
</style>
