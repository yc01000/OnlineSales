<template>
  <!-- <div><img alt="Vue logo" src="./assets/top_logo.gif"></div> -->
  <SearchHeader msg="Search"/>
  <router-view></router-view>
</template>

<script>
import SearchHeader from './components/SearchHeader.vue'

export default {
  name: 'App',
  components: {
    SearchHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
