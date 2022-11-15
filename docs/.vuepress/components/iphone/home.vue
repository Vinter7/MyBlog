<script setup>
import { onMounted } from 'vue'
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.esm.browser.min.js'
onMounted(() => {
  let swiper = new Swiper('.mySwiper', {
    pagination: {
      el: '.swiper-pagination',
    },
  })
  // console.log(swiper)
})
const blue = ['支付宝', '知乎', '菜鸟', '钉钉', '哈啰', 'TIM']
const yellow = ['美团', '微博', '即刻', '闲鱼', 'QQ邮箱']
const red = [
  '网易云',
  '京东',
  '拼多多',
  'YouTube',
  '同花顺',
  '小红书',
]
</script>

<template>
  <div class="swiper mySwiper">
    <div class="swiper-wrapper slides">
      <div class="swiper-slide">
        <div class="app" v-for="i in blue">
          <div class="blue logo"></div>
          <div class="name">{{ i }}</div>
        </div>
        <div class="app">
          <div class="pink logo"></div>
          <div class="name">bilibili</div>
        </div>
      </div>
      <div class="swiper-slide">
        <div class="app" v-for="i in yellow">
          <div class="yellow logo"></div>
          <div class="name">{{ i }}</div>
        </div>
        <div class="app">
          <div class="orange logo"></div>
          <div class="name">淘宝</div>
        </div>
      </div>
      <div class="swiper-slide">
        <div class="app" v-for="i in red">
          <div class="red logo"></div>
          <div class="name">{{ i }}</div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>

  <div id="bar">
    <div class="logo">
      <img
        class="Alogo"
        src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/app_icons/Phone.png"
        alt="设置图标"
      />
    </div>
    <div class="logo">
      <img
        class="Alogo"
        src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/app_icons/Settings.png"
        alt="设置图标"
      />
    </div>
    <div class="logo">
      <img
        class="Alogo"
        src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/app_icons/Photos.png"
        alt="设置图标"
      />
    </div>
    <div class="logo">
      <img
        class="Alogo"
        src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/app_icons/Podcast.png"
        alt="设置图标"
      />
    </div>
  </div>
</template>

<style scoped>
.slides {
  /* background-color: skyblue; */
  height: 440px;
}
.swiper-slide {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  /* background-color: skyblue; */
}

.swiper-pagination-bullet-active {
  background-color: #fff;
}
.Alogo {
  width: 100%;
}
#bar {
  position: absolute;
  width: 100%;
  height: 77px;
  bottom: 0;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.slide {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: flex-start;
  align-content: flex-start;
}
.app {
  flex-basis: 25%;
  padding-top: 20px;
}
.logo {
  margin: auto;
  width: 48px;
  height: 48px;
  background-color: #777;
  border-radius: 12px;
}
.blue {
  background-color: #0e78ff;
}
.yellow {
  background-color: #ffd100;
}
.pink {
  background-color: palevioletred;
}
.green {
  background-color: #00b88f;
}
.red {
  background-color: #be0303;
}
.orange {
  background-color: #fe7300;
}
.name {
  font-size: 12px;
  text-align: center;
  color: #fff;
  line-height: 20px;
}
</style>
