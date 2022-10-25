<script setup>
import { ref } from 'vue'

function add() {
  let cp = arr.value
  let cpF = cp.flat()
  let note = []
  for (let i = 0; i < 16; i++) {
    if (cpF[i] === 0) note.push(i)
  }
  let rd = note[parseInt(Math.random() * note.length)]
  arr.value[parseInt(rd / 4)][rd % 4] = Math.random() < 0.7 ? 2 : 4
}

function re() {
  end = false
  arr.value = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  add()
  add()
}

//转置矩阵
function t(a) {
  let t = [[], [], [], []]
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      t[j][i] = a[i][j]
    }
  }
  return t
}
//点击程序
function play(i) {
  if (end) return
  let cp = arr.value
  let a
  let b
  if (i == 1) a = t(t(cp).map((it) => run(it)))
  if (i == 2) {
    b = t(cp).map((it) => it.reverse())
    a = t(b.map((it) => run(it).reverse()))
  }
  if (i == 3) a = cp.map((it) => run(it))
  if (i == 4) {
    b = cp.map((it) => run(it.reverse()))
    a = b.map((it) => it.reverse())
  }
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (cp[x][y] != a[x][y]) {
        arr.value = a
        add()
        return
      }
    }
  }
  let flat = cp.flat()
  if (!flat.includes(0)) {
    end = true
    alert(`游戏结束, 您获得的最高分为${Math.max(...flat)}`)
  }
}
//左移
function run(a) {
  let not0 = a.filter((i) => i != 0)
  for (let i = 0; i < not0.length - 1; i++) {
    if (not0[i] === not0[i + 1]) {
      not0[i] += not0[i]
      not0[i + 1] = 0
      break
    }
  }
  let rt = not0.filter((i) => i != 0)
  for (let i = rt.length; i < 4; i++) {
    rt.push(0)
  }
  return rt
}

let arr = ref([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
])
add()
add()
let end = false
</script>

<template>
  <div class="flexbox">
    <div class="grid">
      <div v-for="i in arr.flat()" class="items">
        {{ i ? i : '' }}
      </div>
    </div>

    <div class="tb">
      <div class="tr">
        <div class="td"></div>
        <button @click="play(1)" class="td">
          {{ '向上\u{2B06}' }}
        </button>
        <div class="td"></div>
      </div>
      <div class="tr">
        <button @click="play(3)" class="td">
          {{ '\u{2B05}向左' }}
        </button>
        <div class="td">
          <button id="re" @click="re">😊</button>
        </div>
        <button @click="play(4)" class="td">
          {{ '向右\u{27A1}' }}
        </button>
      </div>
      <div class="tr">
        <div class="td"></div>
        <button @click="play(2)" class="td">
          {{ '向下\u{2B07}' }}
        </button>
        <div class="td"></div>
      </div>
    </div>
  </div>
</template>

<style>
.flexbox {
  display: flex;
  justify-content: space-evenly;
}
.grid {
  display: grid;
  width: min-content;
  grid-template: repeat(4, 50px) / repeat(4, 50px);
  text-align: center;
  gap: 3px;
}
.items {
  color: var(--c-bg);
  background-color: var(--c-brand);
  font: bold 25px/2 arial;
  border-radius: 10%;
}
.tb {
  display: table;
  height: min-content;
  margin-top: 30px;
}
.tr {
  display: table-row;
}
.td {
  display: table-cell;
  width: 60px;
  height: 50px;
}
#re {
  display: block;
  background-color: var(--c-bg);
  width: 40px;
  height: 42px;
  border: none;
  margin-left: 10px;
  font-size: 20px;
}
</style>
