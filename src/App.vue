<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import './style/reset.css';
  @import '//at.alicdn.com/t/font_393257_mykx60pggt84obt9.css';
  @import './style/ele.scss';
  @import './style/common.scss';

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
