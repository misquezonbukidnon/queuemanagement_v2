<template>
  <div id="app">
    <div id="nav">
  
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
body{
  background-color: white;
  padding: 40px 40px 40px 40px;
  background-color: #008AD8;


  background-repeat: no-repeat ;
  background-position: 20vw 10px !important;
  background-size: 90%;
}
</style>
