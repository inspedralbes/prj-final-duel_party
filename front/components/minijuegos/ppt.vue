<template>
  <main>
    <div class="contenedor">
      <div class="titulo">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

        <h1>PIEDRA PAPEL TIJERA</h1>
      </div>
      <div class="grid-img">

        <img class="j1" src="/images/ppt/j1-cargando.gif" alt="Jugador 1" />
        <img class="j2" src="/images/ppt/j2-cargando.gif" alt="Jugador 2" />
        <img class="vs" src="/images/ppt/vs.png" alt="vs">
      </div>
    </div>
  </main>
</template>


<script setup>

</script>
<style scoped>
html{
  margin: 0;
  padding: 0;
  height: 100%;
}
main {
  margin: 0;
  padding: 0;
  
}
.contenedor{
  background-image: url('/images/ppt/fondo2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  
}

.titulo {
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  color: white;
}

.grid-img {
  display: grid;
  width: 300px;
  margin-left: 330px;
  margin-top: 100px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0px;
  place-items: center;

}

.j1 {
  width: 230px;
  grid-column-start: 1;
  grid-row-start: 3;
}

.j2 {
  width: 230px;
  grid-column-start: 3;
  grid-row-start: 1;
}

.vs {
  width: 170px;
  grid-column-start: 2;
  grid-row-start: 2;
}
</style>