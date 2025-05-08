<template>
  
  <div class="div-inicio">
    <NuxtLink to="/jugar">
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
      <img class="logo" src="/images/logo.webp" alt="" srcset=""> <br>
      <button class="btn-inicio">EMPEZAR</button>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}


</script>

<style scoped>
.div-inicio {
  background-image: url('/images/fondo-inicio.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  margin: 0;
  padding: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: 'Press Start 2P', cursive;
  place-items: center;

}
.logo {
  width: 700px;
  
}
.btn-inicio {
  height: 70px;
  width: 250px;
  font-size: 26px;
  border: 1px solid black;
  background-color: #292828;
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
  transition: transform 0.3s, background-color 0.3s;
  font-family: 'Press Start 2P', cursive;
  margin-left: 20px;
  
}

.btn-inicio:hover {
  background-color: #00a6bc;
  color: #ffffff;
  transform: scale(1.05);
}

.btn-inicio:active {
  transform: scale(1);
}
</style>