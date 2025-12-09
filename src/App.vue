<template>
  <div id="app">
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Vazir', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
}
</style>

