<template>
    <main>

        <div class="ganador">
            <span id="nombre-ganador">{{props.data}}</span> es el ganador
        </div>
    </main>
</template>
<script setup>

const props = defineProps({
    data: {
        type: String,
        required: true,
    },

},)

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.ganador {
    background: linear-gradient(45deg, rgb(172, 172, 172), rgb(131, 131, 131));
    color: white;
    font-family: 'Press Start 2P', cursive;
    font-size: 24px;
    width: 500px;
    font-weight: bold;
    padding: 20px;
    border-radius: 12px;
    text-align: center;


}
</style>