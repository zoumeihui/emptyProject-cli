<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import Nav from './components/Nav'
  export default {
    components:{
      Nav
    }
  }
</script>

<style>
   html,body{
     height: 100%;
   }
</style>
