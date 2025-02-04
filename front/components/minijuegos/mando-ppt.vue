<template>
    <main>
        <div class="titulo">
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
            <h1>ESCOGE</h1>
        </div>
        <div class="contenedor">
            <img class="piedra" src="/images/ppt/boton-piedra.png"/>
            <img class="papel" src="/images/ppt/boton-papel.png"/>
            <img class="tijera" src="/images/ppt/boton-tijera.png"/>
        </div>
    </main>
</template>

<script setup></script>

<style scoped>

.contenedor {
    display: grid;
    margin-top: 20px;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    place-items: center;
    justify-content: center;
    padding: 10px;
}
.titulo {
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  color: rgb(0, 0, 0);
}

.piedra, .papel, .tijera {
    width: 100%;
    max-width: 190px;
    transition: transform 0.3s ease, filter 0.3s ease;
}

.piedra:hover, .papel:hover, .tijera:hover {
    transform: scale(1.1); 
    filter: brightness(1.2); 
}

@media (max-width: 600px) {
    .contenedor {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        margin-top: 40px;
    }

    .piedra, .papel, .tijera {
        max-width: 100px;
    }
}

</style>
