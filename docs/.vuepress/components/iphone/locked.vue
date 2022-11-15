<script setup>
const day = new Date
const week = ['天','一','二','三','四','五','六']
const date = `${day.getMonth()+1}月${day.getDate()}日  星期${week[day.getDay()]}`
</script>


<template>
<div id="time"><slot></slot></div>
<div id="date">{{date}}</div>
<div id="p1">按下主屏幕按钮以打开</div>
</template>


<style scoped>
#time{
  position: absolute;
  left: 50%;transform: translate(-50%);
  top: 70px;
  font-size: 50px;
  color: #fff;
}
#date{
  position: absolute;
  left: 50%;transform: translate(-50%);
  top: 130px;
  font-size: 17px;
  color: #fff;
}
#p1{
  white-space: nowrap;
  font-size: 14px;
  left: 50%;transform: translate(-50%);
  bottom: 10px;
  color: #fff;
  position: absolute;
  animation: spotlight 5s;
}

@keyframes spotlight {
  0% {clip-path: ellipse(0px 10px);}
  100% {clip-path: ellipse(70px 30px);}
}
</style>